import { ethers } from "hardhat";
import argumentsStakeERC20 from "../arguments/StakeERC20";
import { getRewardTokenArguments } from "../arguments/RewardERC20";
import { getStakingContractArguments } from "../arguments/StakingContract";

// npx hardhat run --network goerli scripts/deploy.ts
// npx hardhat verify --network goerli --constructor-args ./arguments/StakeERC20.ts 0x17B5B59a78894C0Ff3d30ac9f1c3B02C16F7eDE7
// npx hardhat verify --network goerli --constructor-args ./arguments/RewardERC20.ts 0xc13f39faA23dEb7476F74b5ddA5FdF3F01Aa0579
// npx hardhat verify --network goerli --constructor-args ./arguments/StakingContract.ts 0xdFfF627165D0C6c3dE638d76Cd923d5E010a7Ff9

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const StakeERC20Factory = await ethers.getContractFactory("StakeERC20");
  const StakeERC20Contract = await StakeERC20Factory.deploy(
    ...argumentsStakeERC20
  );
  await StakeERC20Contract.deployed();
  console.log("StakeERC20Contract deployed to:", StakeERC20Contract.address);

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const RewardERC20Factory = await ethers.getContractFactory("RewardERC20");
  const RewardERC20Contract = await RewardERC20Factory.deploy(
    ...getRewardTokenArguments(deployer.address)
  );
  await RewardERC20Contract.deployed();
  console.log("RewardERC20Contract deployed to:", RewardERC20Contract.address);

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const StakingContractFactory = await ethers.getContractFactory(
    "StakingContract"
  );
  const StakingContract = await StakingContractFactory.deploy(
    ...getStakingContractArguments(
      StakeERC20Contract.address,
      RewardERC20Contract.address
    )
  );
  await StakingContract.deployed();
  console.log("StakingContract deployed to:", StakingContract.address);

  await RewardERC20Contract.changeRoleStaking(StakingContract.address);
  console.log(
    `Staking role in rewardTokenInstance changed to: ${StakingContract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
