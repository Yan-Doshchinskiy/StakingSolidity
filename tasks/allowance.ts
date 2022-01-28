import { task } from "hardhat/config";

task("allowance", "Allowance")
  .addParam("owner", "owner address")
  .addParam("spender", "spender address")
  .addParam("amount", "spender address")
  .setAction(
    async ({ owner, spender }: { owner: string; spender: string }, hre) => {
      const instance = await hre.ethers.getContractAt(
        "ShitcoinToken",
        process.env.CONTRACT_ADDRESS as string
      );
      const allowance = await instance.allowance(owner, spender);
      console.log("allowance", allowance);
    }
  );
