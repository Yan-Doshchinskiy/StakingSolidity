import { ethers } from "hardhat";

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();
  const distributionTime = 1200;
  const basePercent = 20;
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Token = await ethers.getContractFactory("StakingContract");
  type StakingPayload = [string, string, number, number];
  const deployPayload: StakingPayload = [
    process.env.LP_TOKEN_ADDRESS as string,
    process.env.REWARD_TOKEN_ADDRESS as string,
    distributionTime,
    basePercent,
  ];
  const Contract = await Token.deploy(...deployPayload);
  await Contract.deployed();
  console.log("StakingContract deployed to:", Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
