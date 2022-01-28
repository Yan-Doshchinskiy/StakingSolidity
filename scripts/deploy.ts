import { ethers } from "hardhat";

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Token = await ethers.getContractFactory("ShitcoinToken");
  const Contract = await Token.deploy();
  await Contract.deployed();
  console.log("ShitcoinToken deployed to:", Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
