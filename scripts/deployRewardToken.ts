import { ethers } from "hardhat";

// npx hardhat run scripts/deployRewardToken.ts --network sepolia
// npx hardhat verify --network sepolia --contract contracts/RewardToken.sol:RewardToken 0xCA19ca95bD8675d77c1eC90Bdb4FBe7FD4FeEd8D
async function deployRewardToken(): Promise<void> {
  try {
    const contractName = "RewardToken";

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Token = await ethers.getContractFactory(contractName);
    type StakingPayload = [];
    const deployPayload: StakingPayload = [];
    const Contract = await Token.deploy(...deployPayload);
    await Contract.deployed();
    console.log(`${contractName} deployed to:`, Contract.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

deployRewardToken();
