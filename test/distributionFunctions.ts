import { expect } from "chai";

export default (): void => {
  it("DISTRIBUTION:Distribution time equl to deploy parameter'", async function (): Promise<void> {
    const time = await this.instance.getDistributionTime();
    expect(time).to.equal(this.distributionTime);
  });
  it("DISTRIBUTION:Distribution time changed from 60 to 120 sec'", async function (): Promise<void> {
    await this.instance.changeDistributionTime(120);
    const time = await this.instance.getDistributionTime();
    expect(time).to.equal(120);
  });
  it("DISTRIBUTION:getDistributionTime should be reverted if time less or equal then 5 sec'", async function (): Promise<void> {
    await expect(this.instance.changeDistributionTime(3)).to.be.revertedWith(
      "distribution time should be greater or equal then 5 sec"
    );
  });
  it("DISTRIBUTION:Distribution time changed from 60 to 5 sec", async function (): Promise<void> {
    await this.instance.changeDistributionTime(5);
    const time = await this.instance.getDistributionTime();
    expect(time).to.equal(5);
  });
  it("DISTRIBUTION:Earning percent equl to deploy parameter'", async function (): Promise<void> {
    const percent = await this.instance.getEarningPercent();
    expect(percent).to.equal(this.basePercent);
  });
  it("DISTRIBUTION:Earning percent changed from 20 to 15 %'", async function (): Promise<void> {
    await this.instance.changeEarningPercent(15);
    const percent = await this.instance.getEarningPercent();
    expect(percent).to.equal(15);
  });
  it("DISTRIBUTION:getEarningPercent should be reverted if percent less then 5 %'", async function (): Promise<void> {
    await expect(this.instance.changeEarningPercent(3)).to.be.revertedWith(
      "earning percent should be greater than or equal to 5%"
    );
  });
  it("DISTRIBUTION:earning percent changed to 5%'", async function (): Promise<void> {
    await this.instance.changeEarningPercent(5);
    const percent = await this.instance.getEarningPercent();
    await expect(percent).to.be.equal(5);
  });
  it("DISTRIBUTION:getEarningPercent should be reverted if percent greater then 40 %'", async function (): Promise<void> {
    await expect(this.instance.changeEarningPercent(41)).to.be.revertedWith(
      "earning percent should be less than or equal to 40:"
    );
  });
  it("DISTRIBUTION:earning percent changed to 40%'", async function (): Promise<void> {
    await this.instance.changeEarningPercent(40);
    const percent = await this.instance.getEarningPercent();
    await expect(percent).to.be.equal(40);
  });
};
