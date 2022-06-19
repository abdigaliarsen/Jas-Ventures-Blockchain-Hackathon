// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketplaceERC20 is ERC20 {
    uint256 constant private TOKEN_PRICE = 0.01 ether;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mintTo() payable external {
        require(msg.value != 0, "ERC20: Cannot buy zero tokens");
        _mint(msg.sender, msg.value * TOKEN_PRICE);
    }

    function mintFor(address _to, uint256 _tokens) external payable {
        require(msg.value == _tokens * TOKEN_PRICE, "ERC20: Not enough ether to mint");
        _mint(_to, _tokens);
    }

    function burnTo(uint256 _tokens) external {
        require(address(this).balance >= _tokens * TOKEN_PRICE, "ERC20: Not enough ethers to pay to you");
        require(balanceOf(msg.sender) >= _tokens, "ERC20: You don't have enough tokens to burn");
        _burn(msg.sender, _tokens);
        payable(msg.sender).transfer(_tokens * TOKEN_PRICE);
    }
}