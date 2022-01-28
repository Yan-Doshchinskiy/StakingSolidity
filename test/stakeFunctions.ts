import { expect } from "chai";

export default (): void => {
  it("STAKING:Initial staked amount equal to zero'", async function (): Promise<void> {
    const balance = await this.instance.getTotalStaked();
    expect(balance).to.equal(0);
  });
  it("STAKING:total staked amount equal to 100000000000000000000 after stake", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "100000000000000000000");
    await this.stakeInstance.approve(
      this.instance.address,
      "100000000000000000000"
    );
    await this.instance.stake("100000000000000000000");
    const totalStaked = await this.instance.getTotalStaked();
    expect(totalStaked).to.equal("100000000000000000000");
  });
  it("STAKING:stake transaction reverts if amount exceeds allowance", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "100000000000000000000");
    await this.stakeInstance.approve(
      this.instance.address,
      "50000000000000000000"
    );
    await expect(
      this.instance.stake("100000000000000000000")
    ).to.be.revertedWith("Amount exceeds allowance");
  });
  it("STAKING:stake transaction reverts if amount equal to zero", async function (): Promise<void> {
    await expect(this.instance.stake(0)).to.be.revertedWith(
      "stake amount should be greater than 0"
    );
  });
  it("STAKING:stake transaction reverts if amount exceeds balance", async function (): Promise<void> {
    await expect(this.instance.stake(10)).to.be.revertedWith(
      "Transfer amount exceeds balance"
    );
  });
  it("STAKING:staker data amount equal to 100000000000000000000 after stake", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "100000000000000000000");
    await this.stakeInstance.approve(
      this.instance.address,
      "100000000000000000000"
    );
    await this.instance.stake("100000000000000000000");
    const { totalAmount, operations } = await this.instance.getStakerData(
      this.owner.address
    );
    const { amount } = operations?.[0];
    expect(totalAmount).to.equal("100000000000000000000");
    expect(amount).to.equal("100000000000000000000");
  });
  it("STAKING:Revert if staking amount less then 1'", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "100000000000000000000");
    await expect(this.instance.stake(0)).to.be.revertedWith(
      "stake amount should be greater than 0"
    );
  });
  it("STAKING:Revert if amount exceeds allowance'", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "1000000000000000000000");
    await expect(this.instance.stake("1000000000000000000")).to.be.revertedWith(
      "Amount exceeds allowance"
    );
  });
  it("STAKING:Revert if amount exceeds balance'", async function (): Promise<void> {
    await this.stakeInstance.mint(this.owner.address, "50000000000000000000");
    await expect(
      this.instance.stake("100000000000000000000")
    ).to.be.revertedWith("Transfer amount exceeds balance");
  });
};
