import { expect } from "chai";

export default (): void => {
  it("UNSTAKE:Amount should be greater then 0", async function (): Promise<void> {
    await expect(this.instance.unstake(0)).to.be.revertedWith(
      "unstake amount should be greater than 0"
    );
  });
  it("UNSTAKE:staker balance should be greater then unstake amount", async function (): Promise<void> {
    await expect(this.instance.unstake(10000)).to.be.revertedWith(
      "unstake amount should be less or equal then staker totalAmount"
    );
  });
  it("UNSTAKE:balance after stake and unstake is  equal 1200000000000000000000000", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "9000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "9000000000000000000000000"
    );
    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.unstake("1200000000000000000000000");
    const balance = await this.stakeInstance.balanceOf(this.owner.address);
    // const user = await this.instance.getStakerData(this.owner.address);
    expect(balance).to.be.equal("1200000000000000000000000");
  });
  it("UNSTAKE:balance after stake and unstake is equal to zero", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "9000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "9000000000000000000000000"
    );
    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.unstake("9000000000000000000000000");
    const balance = await this.stakeInstance.balanceOf(this.owner.address);
    // const user = await this.instance.getStakerData(this.owner.address);
    expect(balance).to.be.equal("9000000000000000000000000");
  });
  it("UNSTAKE:if the unstake amount is less than the total amount, then we can see the balance for one operations.", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "9000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "9000000000000000000000000"
    );

    await this.instance.stake("3000000000000000000000000");

    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.unstake("7000000000000000000000000");
    const { operations } = await this.instance.getStakerData(
      this.owner.address
    );
    expect(operations.length).to.be.equal(1);
    expect(operations?.[0].amount).to.be.equal("2000000000000000000000000");
  });
  it("UNSTAKE:if the unstake amount is less than the total amount, then we can see the balance for two operations.", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "9000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "9000000000000000000000000"
    );

    await this.instance.stake("3000000000000000000000000");

    await this.instance.stake("3000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await this.instance.unstake("5000000000000000000000000");
    const { operations } = await this.instance.getStakerData(
      this.owner.address
    );
    expect(operations.length).to.be.equal(2);
    expect(operations?.[0].amount).to.be.equal("1000000000000000000000000");
    expect(operations?.[1].amount).to.be.equal("3000000000000000000000000");
  });
};
