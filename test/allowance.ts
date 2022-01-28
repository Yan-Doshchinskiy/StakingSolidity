import { expect } from "chai";

export default (): void => {
  it("Initial allowance from Bob to Alice must be equal to zero", async function (): Promise<void> {
    const allowance = await this.instance.allowance(
      this.bob.address,
      this.alice.address
    );
    expect(allowance).to.equal(0);
  });
  it("Allowance from Bob to Alice after approve must be equal to 40", async function (): Promise<void> {
    await this.instance.connect(this.bob).approve(this.alice.address, 40);
    const allowance = await this.instance.allowance(
      this.bob.address,
      this.alice.address
    );
    expect(allowance).to.equal(40);
  });
  it("Allowance from Bob to Alice after increaseAllowance must be equal to 50", async function (): Promise<void> {
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 50);
    const allowance = await this.instance.allowance(
      this.bob.address,
      this.alice.address
    );
    expect(allowance).to.equal(50);
  });
  it("Allowance from Bob to Alice after increaseAllowance and decreaseAllowance must be equal to 100", async function (): Promise<void> {
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 200);
    await this.instance
      .connect(this.bob)
      .decreaseAllowance(this.alice.address, 100);
    const allowance = await this.instance.allowance(
      this.bob.address,
      this.alice.address
    );
    expect(allowance).to.equal(100);
  });
  it("Sender can't decrease allowance below zero", async function (): Promise<void> {
    await this.instance
      .connect(this.bob)
      .increaseAllowance(this.alice.address, 200);

    await expect(
      this.instance.connect(this.bob).decreaseAllowance(this.alice.address, 300)
    ).to.be.revertedWith("It's impossible to lower the value below zero");
  });
  it("it is not possible to approve to zero address", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.bob).approve(this.zeroAddress, 40)
    ).to.be.revertedWith("Approve to the zero address");
  });
  it("it is not possible to approve from zero address", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.zeroAddress).approve(this.bob.address, 40)
    ).to.be.revertedWith("Approve from the zero address");
  });
};
