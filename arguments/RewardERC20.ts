// [string memory _name, string memory _symbol, uint256 _decimals,, address _stakingContract]
type argsArray = [string, string, number, string];

const STAKING_CONTRACT = process.env.ZERO_ADDRESS as string;

const baseArgs = ["RewardCoin", "REW", 18];

export const getRewardTokenArguments = (
  contract = STAKING_CONTRACT
): argsArray => {
  return [...baseArgs, contract] as argsArray;
};

export default getRewardTokenArguments() as argsArray;
