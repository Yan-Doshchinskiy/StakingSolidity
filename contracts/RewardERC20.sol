//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RewardERC20 is ERC20, AccessControl {
    // roles
    bytes32 private STAKING_ROLE = keccak256("STAKING_ROLE");

    // state
    address public stakingContract = address(0);
    uint8 private _decimals = 18;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _newDecimals,
        address _stakingContract
    ) ERC20(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(STAKING_ROLE, _stakingContract);
        stakingContract = _stakingContract;
        _decimals = _newDecimals;
    }

    // view function
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address _account, uint256 _amount)
        external
        onlyRole(STAKING_ROLE)
    {
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount)
        external
        onlyRole(STAKING_ROLE)
    {
        _burn(_account, _amount);
    }

    // change staking role
    function changeRoleStaking(address _stakingContract)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(STAKING_ROLE, stakingContract);
        _grantRole(STAKING_ROLE, _stakingContract);
        stakingContract = _stakingContract;
    }
}
