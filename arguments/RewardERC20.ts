// [string memory _name, string memory _symbol, uint256 _decimals,, address _stakingContract]
type argsArray = [string, string, number, string];

const AcdmContract = process.env.STAKING_CONTRACT as string;

const baseArgs = ["RewardCoin", "REW", 6];

export const getRewardTokenArguments = (contract = AcdmContract): argsArray => {
  return [...baseArgs, contract] as argsArray;
};

export default getRewardTokenArguments() as argsArray;
