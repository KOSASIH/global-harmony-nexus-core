// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PiToken is ERC20, AccessControl, Pausable {
    using SafeMath for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    address public treasury;
    uint256 public transferFeePercentage; // Fee percentage (e.g., 2 for 2%)
    mapping(address => bool) public isExcludedFromFee;

    event TransferFeeUpdated(uint256 newFee);
    event TreasuryUpdated(address newTreasury);

    constructor(uint256 initialSupply, address _treasury, uint256 _transferFeePercentage) 
        ERC20("PiToken", "PIT") 
    {
        _mint(msg.sender, initialSupply);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        treasury = _treasury;
        transferFeePercentage = _transferFeePercentage;
        isExcludedFromFee[msg.sender] = true; // Exclude deployer from fees
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(uint256 amount) public onlyRole(BURNER_ROLE) {
        _burn(msg.sender, amount);
    }

    function setTreasury(address _treasury) public onlyRole(DEFAULT_ADMIN_ROLE) {
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setTransferFeePercentage(uint256 _transferFeePercentage) public onlyRole(DEFAULT_ADMIN_ROLE) {
        transferFeePercentage = _transferFeePercentage;
        emit TransferFeeUpdated(_transferFeePercentage);
    }

    function excludeFromFee(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        isExcludedFromFee[account] = true;
    }

    function includeInFee(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        isExcludedFromFee[account] = false;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override whenNotPaused {
        uint256 fee = 0;

        if (!isExcludedFromFee[sender] && !isExcludedFromFee[recipient]) {
            fee = amount.mul(transferFeePercentage).div(100);
            super._transfer(sender, treasury, fee); // Transfer fee to treasury
        }

        super._transfer(sender, recipient, amount.sub(fee)); // Transfer remaining amount
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // Snapshot mechanism (optional)
    function snapshot() public onlyRole(DEFAULT_ADMIN_ROLE) {
        // Logic for snapshotting balances can be implemented here
        // This could involve storing current balances in a mapping or array
    }
}
