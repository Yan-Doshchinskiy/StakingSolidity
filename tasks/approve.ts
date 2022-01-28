import { task } from "hardhat/config";

task("approve", "Approve")
  .addParam("spender", "spender address")
  .addParam("amount", "tokens amount")
  .setAction(
    async ({ spender, amount }: { spender: string; amount: string }, hre) => {
      const [signer] = await hre.ethers.getSigners();
      const instance = await hre.ethers.getContractAt(
        "ShitcoinToken",
        process.env.CONTRACT_ADDRESS as string,
        signer
      );
      await instance.approve(spender, amount);
    }
  );
