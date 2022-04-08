import { expect } from "chai";
import { BigNumber } from "ethers";

export default (): void => {
  it("STAKING-STAKE: stake function works correctly (completed)", async function (): Promise<void> {
    const userBalance = await this.stakeTokenInstance.balanceOf(
      this.user1.address
    );
    expect(userBalance).to.equal(this.testMintAmount);

    const treasuryBalance = await this.stakeTokenInstance.balanceOf(
      this.stakingInstance.address
    );
    expect(treasuryBalance).to.equal(0);
    const totalStakedBefore = await this.stakingInstance.totalStaked();
    expect(totalStakedBefore).to.equal(0);
    const res = await this.stakingInstance
      .connect(this.user1)
      .stake(this.stakeAmount1);
    const { events } = await res.wait();
    const totalStakedAfter = await this.stakingInstance.totalStaked();
    expect(totalStakedAfter).to.equal(
      BigNumber.from(totalStakedBefore).add(this.stakeAmount1)
    );
    const userBalance2 = await this.stakeTokenInstance.balanceOf(
      this.user1.address
    );
    expect(userBalance2).to.equal(
      BigNumber.from(userBalance).sub(this.stakeAmount1)
    );
    const treasuryBalance2 = await this.stakeTokenInstance.balanceOf(
      this.stakingInstance.address
    );
    expect(treasuryBalance2).to.equal(
      BigNumber.from(treasuryBalance).add(this.stakeAmount1)
    );
    const { totalAmount, operations } = await this.stakingInstance
      .connect(this.user1)
      .getStakerData(this.user1.address);
    const amount = operations[0].amount;
    const stakeTime = operations[0].stakeTime;
    const { args } = events.find((it: any) => it.event === "Staked");
    expect(totalAmount).to.be.equal(this.stakeAmount1);
    expect(amount).to.be.equal(BigNumber.from(this.stakeAmount1));
    expect(stakeTime).to.be.equal(BigNumber.from(args.time));
  });
  it("STAKING-STAKE: stake function works correctly (reverted with:'stake amount should be greater than 0')", async function (): Promise<void> {
    await expect(
      this.stakingInstance.connect(this.user1).stake(0)
    ).to.be.revertedWith("stake amount should be greater than 0");
  });
};
