import { ethers } from "hardhat";

async function main() {
  const TARGET_CONTRACT = await ethers.getContractFactory("MockTargetContract");
  const targetContract = await TARGET_CONTRACT.deploy();
  await targetContract.deployed();
  console.log(`Target contract is deployed to ${targetContract.address}`);

  const ERC20 = await ethers.getContractFactory("MarketplaceERC20");
  const erc20 = await ERC20.deploy("OtrarCoin", "OTC");
  await erc20.deployed();
  console.log(`ERC20 contract is deployed to ${erc20.address}`);

  const ERC1155 = await ethers.getContractFactory("MarketplaceERC1155");
  const erc1155 = await ERC1155.deploy("https://example.com");
  await erc1155.deployed();
  console.log(`ERC1155 contract is deployed to ${erc1155.address}`);

  const MARKETPLACE = await ethers.getContractFactory("Marketplace");
  const Marketplace = await MARKETPLACE.deploy(erc1155.address, erc20.address);
  await Marketplace.deployed();
  console.log(`Marketplace is deployed to ${Marketplace.address}`);

  const DAO = await ethers.getContractFactory("DAO");
  const Dao = await DAO.deploy(erc20.address, erc1155.address);
  await Dao.deployed();
  console.log(`Dao is deployed to ${Dao.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
