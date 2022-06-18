// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketplaceERC20 is ERC20 {
    uint256 constant private TOKEN_PRICE = 1 ether;
    uint256 constant private TOKENS_PER_ETHER = 100;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mintTo(uint256 _tokens) payable external {
        require(msg.value == _tokens * TOKEN_PRICE, "ERC20: Not enough ether to mint");
        _mint(msg.sender, _tokens * TOKENS_PER_ETHER);
    }

    function burnTo(uint256 _tokens) external {
        require(address(this).balance >= _tokens * TOKEN_PRICE, "ERC20: Not enough ethers to pay to you");
        require(balanceOf(msg.sender) >= _tokens, "ERC20: You don't have enough tokens to burn");
        _burn(msg.sender, _tokens);
        payable(msg.sender).transfer(_tokens / TOKENS_PER_ETHER);
    }
}