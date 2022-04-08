// [address _stakingToken, address _rewardsToken, uint256 _distributionTime, uint256 _basePercent]

type argsArray = [string, string, number, number];

const REWARD_TOKEN_ADDRESS = process.env.REWARD_TOKEN_ADDRESS as string;
const STAKING_TOKEN_ADDRESS = process.env.STAKING_TOKEN_ADDRESS as string;

const baseArgs = [60, 10];

export const getStakingContractArguments = (
  stakingToken = STAKING_TOKEN_ADDRESS,
  rewardToken = REWARD_TOKEN_ADDRESS
): argsArray => {
  return [stakingToken, rewardToken, ...baseArgs] as argsArray;
};

export default getStakingContractArguments() as argsArray;
