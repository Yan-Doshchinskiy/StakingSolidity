import { task } from "hardhat/config";

task("transfer", "Transfer tokens")
  .addParam("to", "recipient address")
  .addParam("amount", "tokens amount")
  .setAction(async ({ to, amount }: { to: string; amount: string }, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const instance = await hre.ethers.getContractAt(
      "ShitcoinToken",
      process.env.CONTRACT_ADDRESS as string,
      signer
    );
    await instance.transfer(to, amount);
  });
