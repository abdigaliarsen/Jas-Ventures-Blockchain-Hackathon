// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./token/MarketplaceERC1155.sol";
import "./token/MarketplaceERC20.sol";

contract Marketplace is AccessControl {
    using SafeMath for uint256;

    bytes32 constant private OWNER_ROLE = keccak256("OWNER_ROLE");
    uint256 constant public FEE_PERCENTAGE = 1;
    uint256 constant public CREATION_COST = 100;

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public prices;

    /// @dev We define creator of ERC1155 token to set the admin of the poll.
    /// Admin of the future poll pays commission to create the poll.
    /// All other users buy ERC1155 tokens listed by admin to participate in the poll.
    /// Admin MAY buy listed tokens to participate in the poll.
    mapping(uint256 => address) public creators;

    MarketplaceERC1155 immutable public erc1155;
    MarketplaceERC20 immutable public erc20;

    event ItemListed(uint256 indexed tokenId, uint256 amount, uint256 price, address owner);
    event ItemCreated(uint256 amount, address owner);
    event ListingCanceled(uint256 indexed tokenId, address owner);
    event ItemBought(uint256 indexed tokenId, uint256 amount, uint256 price, address seller, address buyer);
    event Withdrawn(uint256 amount);

    constructor(address _erc1155, address _erc20) {
        _grantRole(OWNER_ROLE, msg.sender);
        erc1155 = MarketplaceERC1155(_erc1155);
        erc20 = MarketplaceERC20(_erc20);
    }

    function createItem(uint256 _amount, string memory _category) external {
        require(erc20.balanceOf(msg.sender) >= CREATION_COST, "Marketplace: Not enough balance to buy erc1155");
        require(_amount != 0, "Marketplace: Cannot create zero tokens");

        erc20.transferFrom(msg.sender, address(this), CREATION_COST);
        creators[erc1155.tokensCount()] = msg.sender;
        erc1155.mintTo(msg.sender, _amount, _category);

        emit ItemCreated(_amount, msg.sender);
    }

    function listItem(uint256 _tokenId, uint256 _amount, uint256 _price) external {
        require(creators[_tokenId] == msg.sender, "Marketplace: Only token owner may list the token");
        require(isListed[_tokenId] == false, "Marketplace: Token is already listed");
        require(_price != 0, "Marketplace: Price cannot be zero");
        require(_amount != 0, "Marketplace: Cannot list zero tokens");
        require(erc1155.balanceOf(msg.sender, _tokenId) >= _amount, "Marketplace: Not enough tokens to list");

        erc1155.transferFrom(msg.sender, address(this), _tokenId, _amount);
        isListed[_tokenId] = true;
        prices[_tokenId] = _price;

        emit ItemListed(_tokenId, _amount, _price, msg.sender);
    }

    function cancelListing(uint256 _tokenId, uint256 _amount) external {
        require(creators[_tokenId] == msg.sender, "Marketplace: Only owner may cancel listing");
        require(isListed[_tokenId] == true, "Marketplace: Token is not listed");
        require(erc1155.balanceOf(address(this), _tokenId) >= _amount, "Marketplace: Too huge amount to cancel");

        isListed[_tokenId] = false;
        erc1155.transfer(msg.sender, _tokenId, _amount);

        emit ListingCanceled(_tokenId, msg.sender);
    }

    function buyItem(uint256 _tokenId, uint256 _amount) external {
        require(isListed[_tokenId] == true, "Marketplace: Token is not listed");
        require(erc1155.balanceOf(address(this), _tokenId) >= _amount, "Marketplace: Too huge amount to buy");
        require(erc20.balanceOf(msg.sender) >= prices[_tokenId], "Marketplace: Not enough erc20 tokens to buy item");

        erc20.transferFrom(msg.sender, address(this), prices[_tokenId] * FEE_PERCENTAGE / 100);
        erc20.transferFrom(msg.sender, creators[_tokenId], prices[_tokenId]);

        erc1155.transfer(msg.sender, _tokenId, _amount);
        isListed[_tokenId] = false;

        emit ItemBought(_tokenId, _amount, prices[_tokenId], creators[_tokenId], msg.sender);
        creators[_tokenId] = msg.sender;
    }

    function withdraw() onlyRole(OWNER_ROLE) external {
        uint256 amount = erc20.balanceOf(address(this));
        erc20.transfer(msg.sender, amount);
        emit Withdrawn(amount);
    }
}