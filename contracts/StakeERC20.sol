//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract StakeERC20 is ERC20, AccessControl {
    // state
    uint8 private _decimals = 18;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _newDecimals
    ) ERC20(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _decimals = _newDecimals;
    }

    // view function
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _burn(_account, _amount);
    }
}
