// eslint-disable-next-line node/no-missing-import
import hre, { ethers, artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import ArgumentsStakeERC20 from "../../arguments/StakeERC20";
import viewFunctions from "./viewFunctions";
import supplyFunctions from "./supplyFunctions";

describe("Stake Token contract testing", async function () {
  before(async function () {
    this.hre = hre;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.user1, this.user2, this.user3] =
      await ethers.getSigners();
    this.arguments = ArgumentsStakeERC20;
    this.testMintAmount = "100000000000";
    this.testBurnAmount = "40000000000";
  });
  beforeEach(async function () {
    const stakeArtifact: Artifact = await artifacts.readArtifact("StakeERC20");
    this.instance = await waffle.deployContract(
      this.owner,
      stakeArtifact,
      this.arguments
    );
  });
  viewFunctions();
  supplyFunctions();
});
