// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    event MigrationCompleted(uint completedMigration);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setCompleted(uint completed) public onlyOwner {
        last_completed_migration = completed;
        emit MigrationCompleted(completed);
    }

    function upgrade(address new_address) public onlyOwner {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
