# Crowdfunding Contract

## Overview

This is a simple Solidity smart contract for crowdfunding. It allows contributors to fund a project, and the creator can reclaim the funds if the funding goal is not reached by the specified deadline.

## Smart Contract Details

- **Creator:** Address of the contract creator.
- **Funding Goal:** The target amount to be raised.
- **Deadline:** The timestamp when the crowdfunding period ends.
- **Total Funds:** The current total funds raised.

### Functions

- `contribute()`: Contribute funds to the project before the deadline.
- `reclaimFunds()`: Allow contributors to reclaim their funds after the deadline if the funding goal is not reached.
- `getRemainingTime()`: Get the remaining time until the crowdfunding deadline.

### Events

- `ProjectFunded`: Fired when a contribution is made.
- `FundingGoalReached`: Fired when the funding goal is reached.
- `FundsRefunded`: Fired when funds are refunded to a contributor.

## Usage

### Contribute to the Project

To contribute funds to the crowdfunding campaign, users can call the `contribute()` function. This function accepts Ether and adds the contribution to the total funds raised. Contributions are only accepted before the campaign deadline, ensuring that supporters are aware of the project's status.

### Check Funding Progress

To monitor the funding progress and remaining time of the campaign, users can call the getRemainingTime() function. This function returns the time remaining until the campaign deadline

### Refund Funds

If the campaign deadline passes and the funding goal is not reached, contributors can reclaim their funds by calling the reclaimFunds() function. This ensures that contributors have the option to retrieve their funds if the project is not successfully funded.

### Prerequisites

- Solidity Compiler (Version 0.8.17 or compatible)

### Installation

Clone the repository and compile the Solidity contract:

### License
This contract is released under the MIT License.