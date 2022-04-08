import { expect } from "chai";
import { BigNumber } from "ethers";

export default (): void => {
  it("REWARD-ERC20-SUPPLY: mint function works correctly", async function (): Promise<void> {
    const balance1 = await this.instance.balanceOf(this.user1.address);
    await expect(
      await this.instance
        .connect(this.user2)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.ok;
    const balance2 = await this.instance.balanceOf(this.user1.address);
    const result = BigNumber.from(balance2).sub(balance1).toString();
    expect(result).to.be.equal(this.testMintAmount);
    await expect(
      this.instance
        .connect(this.user1)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.revertedWith("AccessControl:");
  });
  it("REWARD-ERC20-SUPPLY: burn function works correctly", async function (): Promise<void> {
    await this.instance
      .connect(this.user2)
      .mint(this.user1.address, this.testMintAmount);
    const balance1 = await this.instance.balanceOf(this.user1.address);
    await expect(
      await this.instance
        .connect(this.user2)
        .burn(this.user1.address, this.testBurnAmount)
    ).to.be.ok;
    const balance2 = await this.instance.balanceOf(this.user1.address);
    const result = BigNumber.from(balance1).sub(balance2).toString();
    expect(result).to.be.equal(this.testBurnAmount);
    await expect(
      this.instance
        .connect(this.user1)
        .burn(this.user1.address, this.testBurnAmount)
    ).to.be.revertedWith("AccessControl:");
  });
};
