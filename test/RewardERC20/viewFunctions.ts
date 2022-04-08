import { expect } from "chai";

export default (): void => {
  it("REWARD-ERC20-VIEW: name value equal to constructor argument", async function (): Promise<void> {
    const name = await this.instance.name();
    expect(name).to.equal(this.arguments[0]);
  });
  it("REWARD-ERC20-VIEW: symbol value equal to constructor argument", async function (): Promise<void> {
    const symbol = await this.instance.symbol();
    expect(symbol).to.equal(this.arguments[1]);
  });
  it("REWARD-ERC20-VIEW: decimals value equal to constructor argument", async function (): Promise<void> {
    const decimals = await this.instance.decimals();
    expect(decimals).to.equal(this.arguments[2]);
  });
};
