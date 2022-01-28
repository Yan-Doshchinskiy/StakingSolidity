import { task } from "hardhat/config";

task("claim", "claim method").setAction(async (_: unknown, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const instance = await hre.ethers.getContractAt(
    "StakingContract",
    process.env.CONTRACT_ADDRESS as string,
    signer
  );
  await instance.claim();
});
