// eslint-disable-next-line node/no-missing-import
import hre, { ethers, artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import stakeFunctions from "./stakeFunctions";
import provideFunctions from "./provideFunctions";
import distributionFunctions from "./distributionFunctions";
import claimFunctions from "./claimFunctions";
import unstakeFunctions from "./unstakeFunctions";

describe("Token contract testing", async function () {
  before(async function () {
    this.hre = hre;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.alice, this.bob, this.sharedWallet] =
      await ethers.getSigners();
    this.distributionTime = 1200;
    this.basePercent = 20;
  });
  beforeEach(async function () {
    const rewardArtifact: Artifact = await artifacts.readArtifact(
      "RewardToken"
    );
    this.rewardInstance = await waffle.deployContract(
      this.owner,
      rewardArtifact,
      []
    );
    const stakeArtifact: Artifact = await artifacts.readArtifact("RewardToken");
    this.stakeInstance = await waffle.deployContract(
      this.owner,
      stakeArtifact,
      []
    );
    const artifact: Artifact = await artifacts.readArtifact("StakingContract");
    type StakingPayload = [string, string, number, number];
    const deployPayload: StakingPayload = [
      this.stakeInstance.address,
      this.rewardInstance.address,
      this.distributionTime,
      this.basePercent,
    ];
    this.instance = await waffle.deployContract(
      this.owner,
      artifact,
      deployPayload
    );
  });
  stakeFunctions();
  provideFunctions();
  distributionFunctions();
  claimFunctions();
  unstakeFunctions();
});
