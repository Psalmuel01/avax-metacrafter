# Avax Frontend

## Contract Overview

This Contract is a simple secret contract that allows to you to set anyone to set secret and get it on the blockchain. It can also show the address of the owner of the contract who deployed it.

## Contract Details

### setSecret(string memory _secret)

Allows the user set any secret message

### showSecret()

A function that returns the last updated secret message.

### showOwner()

This function returns th eaddress of the owner of the contract

## Frontend Integration

A UI was built to display and interact with the contract using React.js and Ethers.

`To run the Frontend`

```zsh
   cd ui-frontend

   # Install dependencies
   yarn

   # Run Server
   yarn dev
```

After this, the project will be running on your localhost. Typically at http://localhost:5173/