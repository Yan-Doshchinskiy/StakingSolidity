// eslint-disable-next-line node/no-missing-import
import hre, { ethers, artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import viewFunctions from "./viewFunctions";
import rolesFunctions from "./rolesFunctions";
import supplyFunctions from "./supplyFunctions";
import { getRewardTokenArguments } from "../../arguments/RewardERC20";

describe("Reward Token contract testing", async function () {
  before(async function () {
    this.hre = hre;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.user1, this.user2, this.user3] =
      await ethers.getSigners();
    this.arguments = getRewardTokenArguments(this.user2.address);

    this.testMintAmount = "100000000000";
    this.testBurnAmount = "40000000000";
  });
  beforeEach(async function () {
    const rewardArtifact: Artifact = await artifacts.readArtifact(
      "RewardERC20"
    );
    this.instance = await waffle.deployContract(
      this.owner,
      rewardArtifact,
      this.arguments
    );
  });
  viewFunctions();
  rolesFunctions();
  supplyFunctions();
});
