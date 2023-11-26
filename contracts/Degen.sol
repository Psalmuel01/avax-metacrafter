// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Degen is ERC20 {
    address public owner;
    uint public id;

    struct Item {
        address owner;
        uint256 amount;
        string name;
    }

    mapping(uint => Item) public Items;

    constructor() ERC20("Degen", "DGN") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function createItem(uint256 amount, string memory _name) public onlyOwner {
        id++;
        Item storage item = Items[id];
        item.owner = address(this);
        item.amount = amount;
        item.name = _name;
    }

    function burn(uint amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool success) {
        success = super.transfer(to, amount);
    }

    function redeem(uint id_) public {
        require(id_ <= id, "item does not exist");
        Item storage _item = Items[id_];

        require(_item.owner == address(this), "item already redeemed");
        _burn(msg.sender, _item.amount);
        _item.owner = msg.sender;
    }

    function checkUnclaimedItem(uint id_) public view returns (bool) {
        Item storage _item = Items[id_];
        return (_item.owner != address(this));
    }

    function showItems(uint id_) public view returns (Item memory) {
        return Items[id_];
    }
}
