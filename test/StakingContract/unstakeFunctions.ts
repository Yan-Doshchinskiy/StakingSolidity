import { expect } from "chai";
import { BigNumber } from "ethers";

export default (): void => {
  it("STAKING-UNSTAKE: unstake function works correctly (completed)", async function (): Promise<void> {
    await this.stakingInstance.connect(this.user1).stake(this.stakeAmount1);
    const userStakedBefore = await this.stakingInstance.getStakerData(
      this.user1.address
    );
    const totalStakedBefore = await this.stakingInstance.totalStaked();
    const userBalanceBefore = await this.stakeTokenInstance.balanceOf(
      this.user1.address
    );
    const tx = await this.stakingInstance
      .connect(this.user1)
      .unstake(this.unstakeAmount1);
    const { events } = await tx.wait();
    const { args } = events.find((it: any) => it.event === "Unstaked");
    const userStakedAfter = await this.stakingInstance.getStakerData(
      this.user1.address
    );
    const totalStakedAfter = await this.stakingInstance.totalStaked();
    const userBalanceAfter = await this.stakeTokenInstance.balanceOf(
      this.user1.address
    );
    expect(userStakedAfter.totalAmount).to.be.equal(
      BigNumber.from(userStakedBefore.totalAmount).sub(this.unstakeAmount1)
    );
    expect(totalStakedAfter).to.be.equal(
      BigNumber.from(totalStakedBefore).sub(this.unstakeAmount1)
    );
    expect(userBalanceAfter).to.be.equal(
      BigNumber.from(userBalanceBefore).add(this.unstakeAmount1)
    );
    expect(userStakedAfter.operations[0].amount).to.be.equal(
      BigNumber.from(userStakedBefore.operations[0].amount).sub(
        this.unstakeAmount1
      )
    );
    const interval = 10 ** 3;
    expect(Number(args.time) + interval).to.be.greaterThan(
      Number(userStakedAfter.operations[0].stakeTime)
    );
    expect(Number(args.time) - interval).to.be.lessThan(
      Number(userStakedAfter.operations[0].stakeTime)
    );
  });
  it("STAKING-UNSTAKE: unstake function works correctly (reverted with:'unstake amount should be greater than 0')", async function (): Promise<void> {
    await expect(
      this.stakingInstance.connect(this.user1).unstake(0)
    ).to.be.revertedWith("unstake amount should be greater than 0");
  });
  it("STAKING-UNSTAKE: unstake function works correctly (reverted with:'unstake amount should be less or equal then staker totalAmount')", async function (): Promise<void> {
    await expect(
      this.stakingInstance.connect(this.user1).unstake(this.unstakeAmount1)
    ).to.be.revertedWith(
      "unstake amount should be less or equal then staker totalAmount"
    );
  });
  it("STAKING-UNSTAKE: unstake function works correctly (completed with several stakes)", async function (): Promise<void> {
    await this.stakingInstance.connect(this.user1).stake(this.stakeAmount1);
    await this.stakingInstance.connect(this.user1).stake(this.stakeAmount1);
    await this.stakingInstance.connect(this.user1).stake(this.stakeAmount3);
    const { operations: operationsBefore } =
      await this.stakingInstance.getStakerData(this.user1.address);
    await this.stakingInstance.connect(this.user1).unstake(this.unstakeAmount3);
    const { operations: operationsAfter } =
      await this.stakingInstance.getStakerData(this.user1.address);
    const SumOerationsBefore = operationsBefore.reduce(
      (acc: BigNumber, rec: { amount: BigNumber; time: number }): BigNumber =>
        acc.add(rec.amount),
      BigNumber.from(0)
    );
    const SumOerationsAfter = operationsAfter.reduce(
      (acc: BigNumber, rec: { amount: BigNumber; time: number }): BigNumber =>
        acc.add(rec.amount),
      BigNumber.from(0)
    );
    expect(SumOerationsBefore).to.be.equal(
      SumOerationsAfter.add(this.unstakeAmount3)
    );
    const { operations: operationsBefore2 } =
      await this.stakingInstance.getStakerData(this.user1.address);
    await this.stakingInstance.connect(this.user1).unstake(this.unstakeAmount3);
    const { operations: operationsAfter2 } =
      await this.stakingInstance.getStakerData(this.user1.address);
    const SumOerationsBefore2 = operationsBefore2.reduce(
      (acc: BigNumber, rec: { amount: BigNumber; time: number }): BigNumber =>
        acc.add(rec.amount),
      BigNumber.from(0)
    );
    const SumOerationsAfter2 = operationsAfter2.reduce(
      (acc: BigNumber, rec: { amount: BigNumber; time: number }): BigNumber =>
        acc.add(rec.amount),
      BigNumber.from(0)
    );
    expect(SumOerationsBefore2).to.be.equal(
      SumOerationsAfter2.add(this.unstakeAmount3)
    );
  });
};
