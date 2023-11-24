// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract Secret {
    string public secret;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setSecret(string memory _secret) public {
        secret = _secret;
    }

    function showSecret() public view returns (string memory) {
        return secret;
    }

    function showOwner() public view returns (address) {
        return owner;
    }
}