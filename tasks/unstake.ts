import { task } from "hardhat/config";

task("unstake", "unstake method")
  .addParam("amount", "tokens amount")
  .setAction(async ({ amount }: { amount: string }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const instance = await hre.ethers.getContractAt(
      "StakingContract",
      process.env.CONTRACT_ADDRESS as string,
      signer
    );
    await instance.unstake(amount);
  });
