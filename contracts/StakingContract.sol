//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ShitcoinToken {
    // Staker struct
    struct Staker {
        uint256 amount;
        uint256 distributed;
        uint256 gained;
        uint256 missed;
    }

    // stakers mapping
    mapping(address => Staker) private stakers;

    // roles
    bytes32 public ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // tokens
    IERC20 private stakingToken;
    IERC20 private rewardsToken;

    // variables
    uint256 private startTime;
    uint256 private producedTime;
    address private treasury;


    constructor(uint256 _startTime, address _treasury, address _stakingToken, address _rewardsToken) {
        _setupRole(ADMIN_ROLE, msg.sender);
        startTime = _startTime;
        producedTime = _startTime;
        treasury = _treasury;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }
}
