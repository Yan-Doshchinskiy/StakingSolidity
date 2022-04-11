import { ethers } from "hardhat";
import argumentsStakeERC20 from "../arguments/StakeERC20";
import { getRewardTokenArguments } from "../arguments/RewardERC20";
import { getStakingContractArguments } from "../arguments/StakingContract";

// npx hardhat run --network rinkeby scripts/deploy.ts
// npx hardhat verify --network rinkeby --constructor-args ./arguments/StakeERC20.ts 0xF06e48A1786aa1D17BCacda9Cb08722487970ddC
// npx hardhat verify --network rinkeby --constructor-args ./arguments/RewardERC20.ts 0x92C43a6CdE4EAe4fFaae44E15904BD34024F44B8
// npx hardhat verify --network rinkeby --constructor-args ./arguments/StakingContract.ts 0x449B27A2237bed8ad7110E8f9b115f661Fab7c8e

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
