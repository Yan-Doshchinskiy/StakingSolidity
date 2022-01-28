import { expect } from "chai";

export default (): void => {
  it("Bob's initial tokens amount must be equal to zero", async function (): Promise<void> {
    const balance = await this.instance.balanceOf(this.bob.address);
    expect(balance).to.equal(0);
  });

  it("Bobs balance equal to 400 after transfer. Alice balance equal to 600 after transfer", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 1000);
    await this.instance.connect(this.bob).transfer(this.alice.address, 600);
    const bobBalance = await this.instance.balanceOf(this.bob.address);
    expect(bobBalance).to.equal(400);
    const aliceBalance = await this.instance.balanceOf(this.alice.address);
    expect(aliceBalance).to.equal(600);
  });
  it("Bobs balance equal to 400 after transferFrom. Recipient balance equal to 600 after transferFrom", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 1000);
    await this.instance
      .connect(this.alice)
      .transferFrom(this.bob.address, this.sharedWallet.address, 600);
    const bobBalance = await this.instance.balanceOf(this.bob.address);
    expect(bobBalance).to.equal(400);
    const recipientBalance = await this.instance.balanceOf(
      this.sharedWallet.address
    );
    expect(recipientBalance).to.equal(600);
  });
  it("Can't use transferFrom if amount exceeds allowance", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 500);
    await expect(
      this.instance
        .connect(this.alice)
        .transferFrom(this.bob.address, this.sharedWallet.address, 600)
    ).to.be.revertedWith("Amount exceeds allowance");
  });
  it("Can't transfer from zero address", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 1000);
    await expect(
      this.instance.connect(this.zeroAddress).transfer(this.bob.address, 600)
    ).to.be.revertedWith("Transfer from the zero address");
  });
  it("Can't transfer to zero address", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 1000);
    await expect(
      this.instance.connect(this.bob).transfer(this.zeroAddress, 600)
    ).to.be.revertedWith("Transfer to the zero address");
  });
  it("Can't transferFrom from zero address", async function (): Promise<void> {
    await expect(
      this.instance
        .connect(this.bob)
        .transferFrom(this.zeroAddress, this.sharedWallet.address, 600)
    ).to.be.revertedWith("Transfer from the zero address");
  });
  it("Can't transferFrom to zero address", async function (): Promise<void> {
    await expect(
      this.instance
        .connect(this.bob)
        .transferFrom(this.alice.address, this.zeroAddress, 600)
    ).to.be.revertedWith("Transfer to the zero address");
  });
  it("Can't transfer if amount exceeds balance", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 5000);
    await expect(
      this.instance.connect(this.bob).transfer(this.alice.address, 6000)
    ).to.be.revertedWith("Transfer amount exceeds balance");
  });
  it("Can't transferFrom if amount exceeds balance", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 5000);
    await expect(
      this.instance
        .connect(this.alice)
        .transferFrom(this.bob.address, this.sharedWallet.address, 3000)
    ).to.be.revertedWith("Transfer amount exceeds balance");
  });
};
