import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

export default (): void => {
  it("STAKING-CLAIM: claim function works correctly (completed)", async function (): Promise<void> {
    await this.stakingInstance.connect(this.user1).stake(this.stakeAmount1);
    const balanceBefore = await this.rewardTokenInstance.balanceOf(
      this.user1.address
    );
    await ethers.provider.send("evm_increaseTime", [60]);
    await ethers.provider.send("evm_mine", []);
    const amount = await this.stakingInstance.getClaimableAmount(
      this.user1.address
    );
    await this.stakingInstance.connect(this.user1).claim();
    const balanceAfter = await this.rewardTokenInstance.balanceOf(
      this.user1.address
    );
    expect(balanceAfter).to.be.equal(BigNumber.from(balanceBefore).add(amount));
  });
  it("STAKING-CLAIM: claim function works correctly (reverted with:'nothing to claim')", async function (): Promise<void> {
    await expect(
      this.stakingInstance.connect(this.user1).claim()
    ).to.be.revertedWith("nothing to claim");
  });
};
