import { ethers } from "hardhat";

// npx hardhat run scripts/deployStakingToken.ts --network sepolia
// npx hardhat verify --network sepolia --contract contracts/StakingToken.sol:StakingToken 0xb1AD04A4785DdaddaE078D1e96c6B3ff89966A92
async function deployStakingToken(): Promise<void> {
  try {
    const contractName = "StakingToken";

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

deployStakingToken();
