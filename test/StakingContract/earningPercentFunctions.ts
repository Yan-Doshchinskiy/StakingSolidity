import { expect } from "chai";

export default (): void => {
  it("STAKING-EARNING-PERCENT: changeEarningPercent function works correctly (completed)", async function (): Promise<void> {
    const initialPercent = await this.stakingInstance.earningPercent();
    expect(initialPercent).to.equal(this.argumentsStakingContract[3]);
    const correctPercent = 10;
    await this.stakingInstance.changeEarningPercent(correctPercent);
    const percentAfterChange = await this.stakingInstance.earningPercent();
    expect(percentAfterChange).to.equal(correctPercent);
  });
  it("STAKING-EARNING-PERCENT: changeEarningPercent function works correctly (reverted with: 'AccessControl:')", async function (): Promise<void> {
    const correctPercent = 10;
    await expect(
      this.stakingInstance
        .connect(this.user1)
        .changeEarningPercent(correctPercent)
    ).to.be.revertedWith("AccessControl:");
  });
  it("STAKING-EARNING-PERCENT: changeEarningPercent function works correctly (reverted with: 'earning percent should be greater than or equal to 5%')", async function (): Promise<void> {
    const lessPercent = 4;
    await expect(
      this.stakingInstance.changeEarningPercent(lessPercent)
    ).to.be.revertedWith(
      "earning percent should be greater than or equal to 5%"
    );
  });
  it("STAKING-EARNING-PERCENT: changeEarningPercent function works correctly (reverted with: 'earning percent should be less than or equal to 40%')", async function (): Promise<void> {
    const morePercent = 43;
    await expect(
      this.stakingInstance.changeEarningPercent(morePercent)
    ).to.be.revertedWith("earning percent should be less than or equal to 40%");
  });
};
