//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ShitcoinToken {
    // structs
    struct Staker {
        uint256 amount;
        uint256 distributed;
        uint256 gained;
        uint256 missed;
    }

    // variables
    uint256 private startTime;
    uint256 private producedTime;
    address private treasury;
    IERC20 private stakingToken;
    IERC20 private rewardsToken;
    mapping(address => Staker) private stakers;

    constructor(uint256 _startTime, address _treasury, address _stakingToken, address _rewardsToken) {
        startTime = _startTime;
        producedTime = _startTime;
        treasury = _treasury;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }
}
