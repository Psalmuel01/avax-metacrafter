const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Degen", function () {
  let Degen, degen, owner, addr1, addr2;

  beforeEach(async function () {
    Degen = await ethers.getContractFactory("Degen");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    degen = await Degen.deploy();
    await degen.deployed();
  });

  it("Should mint new tokens", async function () {
    await degen.connect(owner).mint(addr1.address, 100);
    expect(await degen.balanceOf(addr1.address)).to.equal(100);
  });

  it("Should burn tokens", async function () {
    await degen.connect(owner).mint(addr1.address, 100);
    await degen.connect(addr1).burn(50);
    expect(await degen.balanceOf(addr1.address)).to.equal(50);
  });

  it("Should create new item", async function () {
    await degen.connect(owner).createItem(100, "Test Item");
    let item = await degen.showItems(1);
    expect(item.owner).to.equal(degen.address);
    expect(item.amount).to.equal(100);
    expect(item.name).to.equal("Test Item");
  });

  it("Should redeem item", async function () {
    await degen.connect(owner).createItem(100, "Test Item");
    await degen.connect(owner).mint(addr1.address, 100);
    await degen.connect(addr1).redeem(1);
    let item = await degen.showItems(1);
    expect(item.owner).to.equal(addr1.address);
  });
});
