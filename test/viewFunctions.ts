import { expect } from "chai";

export default (): void => {
  it("The contract name must be equal to 'Shitcoin Token'", async function (): Promise<void> {
    const name = await this.instance.name();
    expect(name).to.equal("Shitcoin Token");
  });
  it("The contract symbol must be equal to 'SHT'", async function (): Promise<void> {
    const symbol = await this.instance.symbol();
    expect(symbol).to.equal("SHT");
  });
  it("The contract decimals must be equal to '18'", async function (): Promise<void> {
    const decimals = await this.instance.decimals();
    expect(decimals).to.equal("18");
  });
};
