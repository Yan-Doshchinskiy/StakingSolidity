import { expect } from "chai";

export default (): void => {
  it("Contract initial totalSupply must be equal to zero", async function (): Promise<void> {
    const totalSupply = await this.instance.totalSupply();
    expect(totalSupply).to.equal(0);
  });
  it("Total supply after mint must be equal to 5000", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 5000);
    const totalSupply = await this.instance.totalSupply();
    expect(totalSupply).to.equal(5000);
  });
  it("Total supply after mint and burn must be equal to 2500", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 5000);
    await this.instance.connect(this.owner).burn(this.bob.address, 2500);
    const totalSupply = await this.instance.totalSupply();
    expect(totalSupply).to.equal(2500);
  });
  it("Bob's balance after mint must be equal to 1000", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    const balance = await this.instance.balanceOf(this.bob.address);
    expect(balance).to.equal(1000);
  });
  it("Bob's balance after mint and burn must be equal to 500", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance.connect(this.owner).burn(this.bob.address, 500);
    const balance = await this.instance.balanceOf(this.bob.address);
    expect(balance).to.equal(500);
  });
  it("Bob's balance after mint and burn must be equal to zero", async function (): Promise<void> {
    await this.instance.connect(this.owner).mint(this.bob.address, 1000);
    await this.instance.connect(this.owner).burn(this.bob.address, 1000);
    const balance = await this.instance.balanceOf(this.bob.address);
    expect(balance).to.equal(0);
  });
  it("Only owner can mint tokens", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.bob).mint(this.alice.address, 1000)
    ).to.be.revertedWith("You are not the owner");
  });
  it("Only owner can burn tokens", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.bob).burn(this.alice.address, 1000)
    ).to.be.revertedWith("You are not the owner");
  });
  it("Can't mint tokens for zero address", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.owner).mint(this.zeroAddress, 1000)
    ).to.be.revertedWith("Transfer to the zero address");
  });
  it("Can't mint zero amount", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.owner).mint(this.bob.address, 0)
    ).to.be.revertedWith("Zero tokens amount for mint");
  });
  it("Can't burn tokens for zero address", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.owner).burn(this.zeroAddress, 1000)
    ).to.be.revertedWith("Can't burn tokens from zero addrress");
  });
  it("Can't burn if amount exceeds balance", async function (): Promise<void> {
    await expect(
      this.instance.connect(this.owner).burn(this.bob.address, 10000)
    ).to.be.revertedWith("Burn amount exceeds balance");
  });
};
