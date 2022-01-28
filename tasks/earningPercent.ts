import { task } from "hardhat/config";

task("changeEarningPercent", "changeEarningPercent method")
  .addParam("percent", "earning percent")
  .setAction(async ({ percent }: { percent: number }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const instance = await hre.ethers.getContractAt(
      "StakingContract",
      process.env.CONTRACT_ADDRESS as string,
      signer
    );
    await instance.changeDistributionTime(percent);
  });
