import { expect } from "chai";
import { ethers } from "hardhat";

export default (): void => {
  it("CLAIM:initial claimable amount equal to 0", async function (): Promise<void> {
    const claimable = await this.instance.getClaimableAmount(
      this.owner.address
    );
    expect(claimable).to.equal(0);
  });
  it("CLAIM:claimable amount after 2600 sec waiting is increased", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    const claimable: number = await this.instance.getClaimableAmount(
      this.owner.address
    );

    expect(claimable).to.equal("1800000000000000000000000");
  });
  it("CLAIM:owner claim rewards after 2600 sec", async function (): Promise<void> {
    await this.rewardInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.rewardInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.instance.provideRewards("20000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    const claimable: number = await this.instance.getClaimableAmount(
      this.owner.address
    );
    await this.instance.claim();
    const balance = await this.rewardInstance.balanceOf(this.owner.address);

    expect(balance).to.equal(claimable);
  });
  it("CLAIM:multiply claim", async function (): Promise<void> {
    await this.rewardInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.rewardInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.instance.provideRewards("20000000000000000000000000");
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    const claimable: number = await this.instance.getClaimableAmount(
      this.owner.address
    );
    await this.instance.claim();
    const balance = await this.rewardInstance.balanceOf(this.owner.address);
    expect(balance).to.equal(claimable);
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    const secondClaimed: number = await this.instance.getClaimableAmount(
      this.owner.address
    );

    await this.instance.claim();

    const secondBalance = await this.rewardInstance.balanceOf(
      this.owner.address
    );
    expect(+String(secondBalance).slice(0, 4)).to.equal(
      +String(secondClaimed).slice(0, 4) + +String(claimable).slice(0, 4)
    );
  });
  it("CLAIM:nothing to claim", async function (): Promise<void> {
    await expect(this.instance.claim()).to.be.revertedWith("nothing to claim");
  });
  it("CLAIM:there are not enough tokens on the contract balance", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await expect(this.instance.claim()).to.be.revertedWith(
      "Transfer amount exceeds balance"
    );
  });
  it("CLAIM:there are not enough tokens on the contract balance", async function (): Promise<void> {
    await this.stakeInstance.mint(
      this.owner.address,
      "20000000000000000000000000"
    );
    await this.stakeInstance.approve(
      this.instance.address,
      "20000000000000000000000000"
    );
    await this.instance.stake("3000000000000000000000000");
    await ethers.provider.send("evm_increaseTime", [1300]);
    await this.instance.stake("3000000000000000000000000");
    await expect(this.instance.claim()).to.be.revertedWith(
      "Transfer amount exceeds balance"
    );
  });
};
