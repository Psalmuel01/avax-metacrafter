// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CrowdfundingContract {
  address public creator;
  uint256 public fundingGoal;
  uint256 public deadline;
  uint256 public totalFunds;

  mapping(address => uint256) public contributions;
  mapping(address => bool) public hasWithdrawn;

  event ProjectFunded(address indexed contributor, uint256 amount);
  event FundingGoalReached(uint256 totalFunds);
  event FundsRefunded(address indexed contributor, uint256 amount);

  modifier onlyCreator() {
    require(msg.sender == creator, "Only the creator can call this function");
    _;
  }

  modifier beforeDeadline() {
    require(block.timestamp < deadline, "Deadline for contributions has passed");
    _;
  }

  constructor(uint256 _fundingGoal, uint256 _durationDays) {
    creator = msg.sender;
    fundingGoal = _fundingGoal;
    deadline = block.timestamp + (_durationDays * 1 days);
  }

  function contribute() public payable beforeDeadline {
    contributions[msg.sender] += msg.value;
    totalFunds += msg.value;

    emit ProjectFunded(msg.sender, msg.value);

    // Check if funding goal is reached
    if (totalFunds >= fundingGoal) {
      emit FundingGoalReached(totalFunds);
    }
  }

  function reclaimFunds() public {
    assert(block.timestamp >= deadline);
    
    if(totalFunds >= fundingGoal || contributions[msg.sender] <= 0 || hasWithdrawn[msg.sender]){
      revert("Cannot reclaim funds");
    }

    uint256 contributionAmount = contributions[msg.sender];
    hasWithdrawn[msg.sender] = true;

    // Refund funds to the contributor
    payable(msg.sender).transfer(contributionAmount);

    // Emit event for funds reclaiming
    emit FundsRefunded(msg.sender, contributionAmount);
  }

  function getRemainingTime() public view returns (uint256) {
    if (block.timestamp < deadline) {
      return deadline - block.timestamp;
    } else {
      return 0;
    }
  }
}