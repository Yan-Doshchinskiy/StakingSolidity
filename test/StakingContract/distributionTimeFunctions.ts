import { expect } from "chai";

export default (): void => {
  it("STAKING-DISTRIBUTION-TIME: changeDistributionTime function works correctly (completed)", async function (): Promise<void> {
    const initialTime = await this.stakingInstance.distributionTime();
    expect(initialTime).to.equal(this.argumentsStakingContract[2]);
    const correctTime = 10;
    await this.stakingInstance.changeDistributionTime(correctTime);
    const timeAfterChange = await this.stakingInstance.distributionTime();
    expect(timeAfterChange).to.equal(correctTime);
  });
  it("STAKING-DISTRIBUTION-TIME: changeDistributionTime function works correctly (reverted with: 'AccessControl:')", async function (): Promise<void> {
    const correctTime = 10;
    await expect(
      this.stakingInstance
        .connect(this.user1)
        .changeDistributionTime(correctTime)
    ).to.be.revertedWith("AccessControl:");
  });
  it("STAKING-DISTRIBUTION-TIME: changeDistributionTime function works correctly (reverted with: 'distribution time should be greater or equal then 5 sec:')", async function (): Promise<void> {
    const incorrectTime = 4;
    await expect(
      this.stakingInstance.changeDistributionTime(incorrectTime)
    ).to.be.revertedWith(
      "distribution time should be greater or equal then 5 sec"
    );
  });
};
