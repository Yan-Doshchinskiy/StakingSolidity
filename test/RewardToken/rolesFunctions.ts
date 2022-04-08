import { expect } from "chai";

export default (): void => {
  it("REWARD-ERC20-ROLES: staking role value equal to constructor argument", async function (): Promise<void> {
    const stakingContract = await this.instance.stakingContract();
    expect(stakingContract).to.equal(this.arguments[3]);
  });
  it("REWARD-ERC20-ROLES: changeRoleStaking function works correctly", async function (): Promise<void> {
    const stakingContract1 = await this.instance.stakingContract();
    expect(stakingContract1).to.equal(this.arguments[3]);
    await expect(
      this.instance
        .connect(this.user2)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.ok;
    await expect(
      this.instance
        .connect(this.user1)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.revertedWith("AccessControl:");
    await this.instance.changeRoleStaking(this.user1.address);
    await expect(
      this.instance
        .connect(this.user1)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.ok;
    await expect(
      this.instance
        .connect(this.user2)
        .mint(this.user1.address, this.testMintAmount)
    ).to.be.revertedWith("AccessControl:");
    const stakingContract2 = await this.instance.stakingContract();
    expect(stakingContract2).to.not.equal(this.arguments[3]);
    expect(stakingContract2).to.be.equal(this.user1.address);
  });
  it(`REWARD-ERC20-ROLES: only owner can call changeRoleStaking function`, async function (): Promise<void> {
    await expect(
      this.instance
        .connect(this.user1.address)
        .changeRoleStaking(this.user1.address)
    ).to.be.revertedWith("AccessControl:");
  });
};
