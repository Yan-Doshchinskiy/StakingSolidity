// eslint-disable-next-line node/no-missing-import
import hre, { ethers, artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import viewFuncTests from "./viewFunctions";
import allowanceTests from "./allowance";
import totalSupplyTests from "./totalSupply";
import transferTests from "./transfer";

describe("Token contract testing", async function () {
  before(async function () {
    this.hre = hre;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.alice, this.bob, this.sharedWallet] =
      await ethers.getSigners();
  });
  beforeEach(async function () {
    const artifact: Artifact = await artifacts.readArtifact("ShitcoinToken");
    this.instance = await waffle.deployContract(this.owner, artifact, []);
  });
  viewFuncTests();
  allowanceTests();
  totalSupplyTests();
  transferTests();
});
