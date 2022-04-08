import { expect } from "chai";
import { BigNumber } from "ethers";

export default (): void => {
  it("STAKE-ERC20-SUPPLY: mint function works correctly", async function (): Promise<void> {
    const balance1 = await this.instance.balanceOf(this.user1.address);
    await expect(
      await this.instance
        .connect(this.user2)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.ok;
    const balance2 = await this.instance.balanceOf(this.user1.address);
    const result = BigNumber.from(balance2).sub(balance1).toString();
    expect(result).to.be.equal(this.testMintAmount);
  });
  it("STAKE-ERC20-SUPPLY: burn function works correctly", async function (): Promise<void> {
    await this.instance
      .connect(this.user2)
      .mint(this.user1.address, this.testMintAmount);
    const balance1 = await this.instance.balanceOf(this.user1.address);
    await expect(
      await this.instance
        .connect(this.owner)
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
