import { ethers } from "hardhat";

async function main() {
  const TARGET_CONTRACT = await ethers.getContractFactory("MockTargetContract");
  const targetContract = await TARGET_CONTRACT.deploy();
  await targetContract.deployed();
  console.log(`Target contract is deployed to ${targetContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
