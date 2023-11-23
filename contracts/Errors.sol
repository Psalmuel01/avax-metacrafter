
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract VotingContract {
    address public owner;
    mapping(address => bool) public hasVoted;

    event VoteCasted(address indexed voter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function vote() public {
        // Check if the voter has already voted
        require(!hasVoted[msg.sender], "You have already voted");

        // Check voter eligibility using revert
        if (!isVoterEligible(msg.sender)) {
            revert("You are not eligible to vote");
        }

        // Mark the voter as having voted
        hasVoted[msg.sender] = true;

        // Emit the VoteCasted event
        emit VoteCasted(msg.sender);

        // Assert that voter has now voted
        assert(hasVoted[msg.sender]);
    }

    function isVoterEligible(address voter) internal pure returns (bool) {
        // In this example, eligibility is determined by a simple condition
        // You can replace this with a more complex eligibility check in a real-world scenario
        return voter != address(0);
    }

    function resetVote(address voter) public onlyOwner {
        // Allow the owner to reset a voter's status (for testing purposes)
        hasVoted[voter] = false;
    }
}
