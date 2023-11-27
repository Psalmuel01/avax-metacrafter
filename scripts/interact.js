async function main() {
  const Degen = "0x162Fa35064E961B608009EF636202979FD74415D";
  const degen = await ethers.getContractAt("Degen", Degen);

  const [signer] = await ethers.getSigners();
  const signerAddress = signer.address;
  const user = "0xeCf1e03887013213a87ACb2B4aC32650DEae6d3f";

  const degenBalance = await degen.balanceOf(signerAddress);
  console.log("Degen balance:", degenBalance);

  //   mint to me
  const mintTx = await degen.mint(signerAddress, 2000);
  await mintTx.wait();

  // burn
  const burnTx = await degen.burn(100);
  await burnTx.wait();

  // create item
  const createItem1Tx = await degen.createItem(500, "mysteryBox");
  await createItem1Tx.wait();
  const createItem2Tx = await degen.createItem(200, "mysteryCard");
  await createItem2Tx.wait();

  // redeem item
  const redeemTx = await degen.redeem(1);
  await redeemTx.wait();

  // check unclaimed
  const item1UnClaimed = await degen.checkUnclaimedItem(1);
  console.log("Item 1 Claimed:", item1UnClaimed);
  const item2UnClaimed = await degen.checkUnclaimedItem(2);
  console.log("Item 2 Claimed:", item2UnClaimed);

  // show items
  const item1 = await degen.showItems(1);
  console.log("item1", item1);
  const item2 = await degen.showItems(2);
  console.log("item2", item2);

  const degenBalance2 = await degen.balanceOf(signerAddress);
  console.log("Degen balance:", degenBalance2);

  userBalance = await degen.balanceOf(user);
  console.log("Degen balance:", userBalance);

  // transfer item
  const transferItemTx = await degen.transfer(user, 100);
  await transferItemTx.wait();

  userBalance2 = await degen.balanceOf(user);
  console.log("Degen balance:", userBalance2);
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
