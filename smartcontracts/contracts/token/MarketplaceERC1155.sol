// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MarketplaceERC1155 is ERC1155Supply {
    mapping(uint256 => mapping(address => uint256)) private approvals;
    mapping(uint256 => string) public categories;

    constructor(string memory uri) ERC1155(uri) {}

    function mintTo(
        address _to,
        uint256 _tokenId,
        uint256 _amount,
        string memory _category
    ) external {
        _mint(_to, _tokenId, _amount, "");
        categories[_tokenId] = _category;
    }

    function approve(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        approvals[tokenId][to] = amount;
    }

    function transfer(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        require(msg.sender != to, "ERC1155: Cannot send back to sender");
        require(
            balances[tokenId][msg.sender] >= amount,
            "ERC1155: Not enough balance to transfer"
        );

        balances[tokenId][to] += amount;
        balances[tokenId][msg.sender] -= amount;

        emit TransferSingle(msg.sender, msg.sender, to, tokenId, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        require(from != to, "ERC1155: Cannot send back to sender");
        require(
            approvals[tokenId][to] >= amount,
            "ERC1155: Receiver is not approved"
        );
        require(
            balances[tokenId][from] >= amount,
            "ERC1155: Not enough balance to transfer"
        );

        approvals[tokenId][to] -= amount;
        balances[tokenId][to] += amount;
        balances[tokenId][from] -= amount;

        emit TransferSingle(from, msg.sender, to, tokenId, amount);
    }

    function setUri(string memory uri) external {
        _setURI(uri);
    }
}
