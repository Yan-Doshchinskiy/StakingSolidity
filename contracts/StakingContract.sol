//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RewardERC20.sol";
import "./StakeERC20.sol";

contract StakingContract is AccessControl {
    // Staker struct
    struct StakerOperations {
        uint256 amount;
        uint256 stakeTime;
    }
    struct Staker {
        uint256 totalAmount;
        StakerOperations[] operations;
    }

    // stakers mapping
    mapping(address => Staker) private stakers;

    // roles
    bytes32 private OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 private TREASURY_ROLE = keccak256("TREASURY_ROLE");

    // tokens
    StakeERC20 public stakingToken;
    RewardERC20 public rewardsToken;

    // variables
    address public treasury;
    uint256 public distributionTime;
    uint256 public earningPercent;
    uint256 public totalStaked;
    int8 private decimalsRatio;

    // events
    event Staked(uint256 amount, uint256 time, address indexed sender);
    event Claimed(uint256 amount, uint256 time, address indexed sender);
    event Unstaked(uint256 amount, uint256 time, address indexed sender);

    // constructor
    constructor(
        address _stakingToken,
        address _rewardsToken,
        uint256 _distributionTime,
        uint256 _basePercent
    ) {
        _setupRole(OWNER_ROLE, msg.sender);
        _setupRole(TREASURY_ROLE, treasury);
        distributionTime = _distributionTime;
        earningPercent = _basePercent;
        stakingToken = StakeERC20(_stakingToken);
        rewardsToken = RewardERC20(_rewardsToken);
        decimalsRatio =
            int8(stakingToken.decimals()) -
            int8(rewardsToken.decimals());
        treasury = address(this);
    }

    // view functions

    function getStakerData(address _spender)
        external
        view
        returns (Staker memory)
    {
        return stakers[_spender];
    }

    function getClaimableAmount(address _spender)
        public
        view
        returns (uint256)
    {
        StakerOperations[] memory operations = stakers[_spender].operations;
        uint256 claimableAmount;
        for (uint256 i = 0; i < operations.length; i++) {
            uint256 stakingPeriod = block.timestamp - operations[i].stakeTime;
            if (stakingPeriod >= distributionTime) {
                uint256 cyclesCount = uint256(stakingPeriod / distributionTime);
                uint256 tokensAmount = (operations[i].amount * earningPercent) /
                    100;
                if (decimalsRatio > 0) {
                    tokensAmount = tokensAmount / 10**_absolute(decimalsRatio);
                } else {
                    tokensAmount = tokensAmount * 10**_absolute(decimalsRatio);
                }
                claimableAmount += cyclesCount * tokensAmount;
            }
        }
        return claimableAmount;
    }

    // change distribution time
    function changeDistributionTime(uint256 _time)
        external
        onlyRole(OWNER_ROLE)
    {
        uint256 minTime = 5;
        require(
            _time >= minTime,
            "distribution time should be greater or equal then 5 sec"
        );
        distributionTime = _time;
    }

    // change earning percent
    function changeEarningPercent(uint256 _percent)
        external
        onlyRole(OWNER_ROLE)
    {
        uint256 minPercent = 5;
        require(
            _percent >= minPercent,
            "earning percent should be greater than or equal to 5%"
        );
        uint256 maxPercent = 40;
        require(
            _percent <= maxPercent,
            "earning percent should be less than or equal to 40%"
        );
        earningPercent = _percent;
    }

    // stake function
    function stake(uint256 _amount) external {
        require(_amount > 0, "stake amount should be greater than 0");
        Staker storage staker = stakers[msg.sender];
        stakingToken.transferFrom(msg.sender, treasury, _amount);
        totalStaked += _amount;
        staker.totalAmount += _amount;
        staker.operations.push(
            StakerOperations({amount: _amount, stakeTime: block.timestamp})
        );
        emit Staked(_amount, block.timestamp, msg.sender);
    }

    //     unstake function
    function unstake(uint256 _amount) external {
        require(_amount > 0, "unstake amount should be greater than 0");
        Staker storage staker = stakers[msg.sender];
        require(
            _amount <= staker.totalAmount,
            "unstake amount should be less or equal then staker totalAmount"
        );
        StakerOperations[] storage operations = stakers[msg.sender].operations;

        stakingToken.transfer(msg.sender, _amount);
        _claim();
        totalStaked -= _amount;
        staker.totalAmount -= _amount;
        uint256 amountToUnstake = _amount;
        while (amountToUnstake > 0) {
            uint256 lastIndex = operations.length - 1;
            if ((amountToUnstake >= operations[lastIndex].amount)) {
                amountToUnstake -= operations[lastIndex].amount;
                operations.pop();
            } else {
                operations[lastIndex].amount -= amountToUnstake;
                amountToUnstake = 0;
            }
        }
        emit Unstaked(_amount, block.timestamp, msg.sender);
    }

    //     claim function
    function claim() external {
        uint256 _claimable = getClaimableAmount(msg.sender);
        require(_claimable > 0, "nothing to claim");
        _claim();
    }

    // utility functions
    function _claim() private {
        uint256 _claimable = getClaimableAmount(msg.sender);
        rewardsToken.mint(msg.sender, _claimable);
        StakerOperations[] storage operations = stakers[msg.sender].operations;
        for (uint256 i = 0; i < operations.length; i++) {
            uint256 stakingPeriod = block.timestamp - operations[i].stakeTime;
            uint256 cyclesCount = uint256(stakingPeriod / distributionTime);
            uint256 time = cyclesCount * distributionTime;
            operations[i].stakeTime += time;
        }
        emit Claimed(_claimable, block.timestamp, msg.sender);
    }

    function _absolute(int8 _val) private pure returns (uint8) {
        return _val >= 0 ? uint8(_val) : uint8(-_val);
    }
}
