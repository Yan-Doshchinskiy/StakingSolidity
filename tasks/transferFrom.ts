import { task } from "hardhat/config";

task("transferFrom", "transferFrom tokens")
  .addParam("from", "owner address")
  .addParam("to", "recipient address")
  .addParam("amount", "tokens amount")
  .setAction(
    async (
      { from, to, amount }: { from: string; to: string; amount: string },
      hre
    ) => {
      const [signer] = await hre.ethers.getSigners();
      const instance = await hre.ethers.getContractAt(
        "ShitcoinToken",
        process.env.CONTRACT_ADDRESS as string,
        signer
      );
      await instance.transferFrom(from, to, amount);
    }
  );
