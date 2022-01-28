import { expect } from "chai";

export default (): void => {
  it("PROVIDE:The treasury address must be equal contract address'", async function (): Promise<void> {
    const treasury = await this.instance.getTreasury();
    const contract = this.instance.address;
    expect(treasury).to.equal(contract);
  });
  it("PROVIDE:Initial treasury balance equal to zero'", async function (): Promise<void> {
    const balance = await this.instance.getTreasuryBalance();
    expect(balance).to.equal(0);
  });
  it("PROVIDE:Owner can provide treasury rewards balance'", async function (): Promise<void> {
    await this.rewardInstance.mint(this.owner.address, "2000000000000000000");
    await this.rewardInstance.approve(
      this.instance.address,
      "1500000000000000000"
    );
    await this.instance.provideRewards("1000000000000000000");
    const balance = await this.instance.getTreasuryBalance();
    expect(balance).to.equal("1000000000000000000");
  });
  it("PROVIDE:owner can't send zero amount'", async function (): Promise<void> {
    await this.rewardInstance.mint(this.owner.address, "2000000000000000000");
    await this.rewardInstance.approve(
      this.instance.address,
      "1500000000000000000"
    );
    await expect(this.instance.provideRewards("0")).to.be.revertedWith(
      "Expected positive amount value"
    );
  });
  it("PROVIDE:Revert if amount exceeds the balance'", async function (): Promise<void> {
    await this.rewardInstance.mint(this.owner.address, "1000000000000000000");
    await this.rewardInstance.approve(
      this.instance.address,
      "1500000000000000000"
    );
    await expect(
      this.instance.provideRewards("1500000000000000000")
    ).to.be.revertedWith("Transfer amount exceeds balance");
  });
  it("PROVIDE:Revert if amount exceeds allowance'", async function (): Promise<void> {
    await this.rewardInstance.mint(this.owner.address, "1000000000000000000");
    await this.rewardInstance.approve(
      this.instance.address,
      "900000000000000000"
    );
    await expect(
      this.instance.provideRewards("1000000000000000000")
    ).to.be.revertedWith("Amount exceeds allowance");
  });
  it("PROVIDE:Revert if sender is not owner'", async function (): Promise<void> {
    const contract = this.instance.connect(this.bob);
    await this.rewardInstance.mint(this.bob.address, "2000000000000000000");
    await this.rewardInstance
      .connect(this.bob)
      .approve(this.instance.address, "1500000000000000000");
    await expect(
      contract.provideRewards("1000000000000000000")
    ).to.be.revertedWith("AccessControl");
  });
};
