const { expect } = require("chai");
const hre = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("degen", function () {
  let degen;
  let owner;
  let user = "0x0000000000000000000000000000000000001234";
  let signedUser;
  const amount = 10000;
  beforeEach(async function () {
    [{ address: owner }] = await hre.ethers.getSigners();
    const Degen = await hre.ethers.getContractFactory("Degen");

    degen = await Degen.deploy();
    await degen.waitForDeployment();
    await degen.mint(owner, 10000);
    signedUser = await hre.ethers.getImpersonatedSigner(user);
    await helpers.setBalance(user, hre.ethers.parseEther("2000"));
  });

  it("should mint", async function () {
    await degen.mint(user, amount);
    expect(await degen.balanceOf(user)).to.equal(amount);
  });

  it("should burn", async function () {
    await degen.mint(user, amount);

    await degen.connect(signedUser).burn(3000);
    expect(await degen.balanceOf(user)).to.equal(7000);
  });

  it("should transfer", async function () {
    await degen.transfer(user, 5000);
    expect(await degen.balanceOf(user)).to.equal(5000);
  });

  it("should create item", async function () {
    await degen.createItem(2000, "box");
    expect(hre.ethers.formatUnits((await degen.Items(1))[1], 0)).to.equal(
      "2000"
    );
    expect((await degen.Items(1))[2]).to.equal("box");
  });

  it("should redeem item", async function () {
    await degen.createItem(1000, "box");
    await degen.mint(user, 1500);
    await degen.connect(signedUser).redeem(1);
    expect(await degen.balanceOf(user)).to.equal(500);
    expect((await degen.Items(1))[0]).to.equal(user);
  });

  it("should check if item is unclaimed", async function () {
    const id = 1;
    isUnclaimed = await degen.checkUnclaimedItem(id);
    expect(isUnclaimed).to.equal(true);
    await degen.createItem(1000, "box");
    await degen.mint(user, 1000);
    await degen.connect(signedUser).redeem(id);
    expect((await degen.Items(1))[0]).to.equal(user);
    expect(isUnclaimed).to.equal(true);
  });
});
