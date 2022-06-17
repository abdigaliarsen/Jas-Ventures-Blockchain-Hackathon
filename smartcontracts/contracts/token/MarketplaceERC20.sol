// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketplaceERC20 is ERC20 {
    uint256 constant private TOKEN_PRICE = 1 ether;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mintTo(uint256 _amount) payable external {
        require(msg.value == _amount * TOKEN_PRICE, "ERC20: Not enough ether to mint");
        _mint(msg.sender, _amount);
    }

    function burnTo(uint256 _amount) external {
        require(address(this).balance >= _amount * TOKEN_PRICE, "ERC20: Not enough ethers to pay to you");
        require(balanceOf(msg.sender) >= _amount, "ERC20: You don't have enough tokens to burn");
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(_amount * TOKEN_PRICE);
    }
}