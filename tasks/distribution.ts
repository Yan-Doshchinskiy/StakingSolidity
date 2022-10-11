import { task } from "hardhat/config";

task("changeDistributionTime", "changeDistributionTime method")
  .addParam("time", "distribution time")
  .setAction(async ({ time }: { time: string }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const instance = await hre.ethers.getContractAt(
      "StakingContract",
      process.env.STAKING_CONTRACT as string,
      signer
    );
    await instance.changeDistributionTime(time);
  });
