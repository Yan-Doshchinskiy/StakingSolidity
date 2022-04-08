// eslint-disable-next-line node/no-missing-import
import hre, { ethers, artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import { getRewardTokenArguments } from "../../arguments/RewardERC20";
import { getStakingContractArguments } from "../../arguments/StakingContract";
import argumentsStakeERC20 from "../../arguments/StakeERC20";
import viewFunctions from "./viewFunctions";
import distributionTimeFunctions from "./distributionTimeFunctions";
import earningPercentFunctions from "./earningPercentFunctions";
import stakeFunctions from "./stakeFunctions";
import unstakeFunctions from "./unstakeFunctions";
import claimFunctions from "./claimFunctions";

describe("Staking contract testing", async function () {
  before(async function () {
    this.hre = hre;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.user1, this.user2, this.user3] =
      await ethers.getSigners();
    this.argumentsRewardERC20 = getRewardTokenArguments(this.user2.address);
    this.argumentsStakeERC20 = argumentsStakeERC20;
    this.testMintAmount = "1000000000000000000000";
    this.testBurnAmount = "200000000000000000000";
    this.stakeAmount1 = "5000000000000000000";
    this.stakeAmount2 = "6000000000000000000";
    this.stakeAmount3 = "13000000000000000000";
    this.unstakeAmount1 = "2000000000000000000";
    this.unstakeAmount2 = "3000000000000000000";
    this.unstakeAmount3 = "9000000000000000000";
  });
  beforeEach(async function () {
    const stakeTokenArtifact: Artifact = await artifacts.readArtifact(
      "StakeERC20"
    );
    this.stakeTokenInstance = await waffle.deployContract(
      this.owner,
      stakeTokenArtifact,
      this.argumentsStakeERC20
    );
    const rewardArtifact: Artifact = await artifacts.readArtifact(
      "RewardERC20"
    );
    this.rewardTokenInstance = await waffle.deployContract(
      this.owner,
      rewardArtifact,
      this.argumentsRewardERC20
    );
    this.argumentsStakingContract = getStakingContractArguments(
      this.stakeTokenInstance.address,
      this.rewardTokenInstance.address
    );
    const stakingArtifact: Artifact = await artifacts.readArtifact(
      "StakingContract"
    );
    this.stakingInstance = await waffle.deployContract(
      this.owner,
      stakingArtifact,
      this.argumentsStakingContract
    );
    await this.rewardTokenInstance.changeRoleStaking(
      this.stakingInstance.address
    );
    await this.stakeTokenInstance
      .connect(this.user1)
      .mint(this.user1.address, this.testMintAmount);
    await this.stakeTokenInstance
      .connect(this.user1)
      .approve(this.stakingInstance.address, this.stakeAmount3);
  });
  viewFunctions();
  distributionTimeFunctions();
  earningPercentFunctions();
  stakeFunctions();
  unstakeFunctions();
  claimFunctions();
});
