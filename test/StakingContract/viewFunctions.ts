import { expect } from "chai";

export default (): void => {
  it("STAKING-VIEW: stakingToken value equal to constructor argument", async function (): Promise<void> {
    const stakingToken = await this.stakingInstance.stakingToken();
    expect(stakingToken).to.equal(this.argumentsStakingContract[0]);
  });
  it("STAKING-VIEW: rewardsToken value equal to constructor argument", async function (): Promise<void> {
    const rewardsToken = await this.stakingInstance.rewardsToken();
    expect(rewardsToken).to.equal(this.argumentsStakingContract[1]);
  });
  it("STAKING-VIEW: distributionTime value equal to constructor argument", async function (): Promise<void> {
    const distributionTime = await this.stakingInstance.distributionTime();
    expect(distributionTime).to.equal(this.argumentsStakingContract[2]);
  });
  it("STAKING-VIEW: earningPercent value equal to constructor argument", async function (): Promise<void> {
    const earningPercent = await this.stakingInstance.earningPercent();
    expect(earningPercent).to.equal(this.argumentsStakingContract[3]);
  });
  it("STAKING-VIEW: treasury address equal to address(this)", async function (): Promise<void> {
    const treasury = await this.stakingInstance.treasury();
    expect(treasury).to.equal(this.stakingInstance.address);
  });
  it("STAKING-VIEW: initial totalStaked amount equal to zero", async function (): Promise<void> {
    const totalStaked = await this.stakingInstance.totalStaked();
    expect(totalStaked).to.equal(0);
  });
};
