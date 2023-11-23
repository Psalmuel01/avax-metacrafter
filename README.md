# Voting Contract

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

The Voting Contract is a simple smart contract written in Solidity that allows eligible voters to cast their votes. The contract ensures that each voter can only vote once and provides a mechanism for the owner to reset a voter's status for testing purposes. It demonstrates the use of `require()`, `assert()`, and `revert()` statements for error handling.

## Author

 Samuel Dahunsi

## Usage

- **Voting:** To cast a vote, users can call the vote() function. The contract ensures that voters can only vote once and checks for eligibility using the isVoterEligible() function. If a voter is not eligible or has already voted, the transaction will revert.

- **Resetting votes:** The owner of the contract can reset a voter's status using the resetVote() function. This function is provided for testing purposes and allows the owner to reset the status of a specific voter.

## Smart Contract Details

### Owner

The contract owner is set during the contract deployment and is the address that deployed the contract.

```solidity
struct Voter {
    string fullName;
    uint256 age;
    string politicalAffiliation;
}
```

### Modifiers

`onlyOwner`: Restricts certain functions to be callable only by the contract owner.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
}
```

### Functions

Constructor

The contract constructor sets the owner to the address that deployed the contract.

```solidity
constructor() {
    owner = msg.sender;
}
```


- **Register Voter**

`vote()`:
The vote() function allows eligible voters to cast their votes. It checks for eligibility, ensures that the voter hasn't voted before, and emits the VoteCasted event.

`isVoterEligible()`:
The isVoterEligible() function determines voter eligibility based on a simple condition. In a real-world scenario, this function can be modified to include more complex eligibility checks.

```solidity
function isVoterEligible(address voter) internal pure returns (bool) {
    return voter != address(0);
}
```

`resetVote()`:
The resetVote() function allows the owner to reset a voter's status for testing purposes.

```solidity
function resetVote(address voter) public onlyOwner {
    hasVoted[voter] = false;
}
```

### License
This contract is released under the MIT License.