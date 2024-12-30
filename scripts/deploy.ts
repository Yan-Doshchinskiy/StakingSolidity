import { ethers } from "hardhat";

// npx hardhat run scripts/deploy.ts --network sepolia
// npx hardhat verify --network sepolia --contract contracts/StakingContract.sol:StakingContract 0x6a261Beab2385a30740e3b1Bc55d8BDe17894429 0xb1AD04A4785DdaddaE078D1e96c6B3ff89966A92 0xCA19ca95bD8675d77c1eC90Bdb4FBe7FD4FeEd8D 1200 20
async function deploy(): Promise<void> {
  try {
    const [deployer] = await ethers.getSigners();
    const distributionTime = 1200;
    const basePercent = 20;
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Token = await ethers.getContractFactory("StakingContract");
    type StakingPayload = [string, string, number, number];
    const deployPayload: StakingPayload = [
      process.env.STAKING_TOKEN_ADDRESS as string,
      process.env.REWARD_TOKEN_ADDRESS as string,
      distributionTime,
      basePercent,
    ];
    const Contract = await Token.deploy(...deployPayload);
    await Contract.deployed();
    console.log("StakingContract deployed to:", Contract.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

deploy();
