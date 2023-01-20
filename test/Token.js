const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  // Define a fixture that deploys and returns the contract instance and test signers
  const deployTokenFixture = async () => {
    // Get test signers
    const [owner, add1, add2] = await ethers.getSigners();

    // Get contract factory and deploy the contract
    const token = await ethers.getContractFactory("Token");
    const hardhatToken = await token.deploy();
    // Wait for deployment to be mined
    await hardhatToken.deployed();

    // Return contract instance and test signers
    return { owner, add1, add2, hardhatToken };
  };

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // Load the fixture and destructure the returned object
    const { owner, hardhatToken } = await loadFixture(deployTokenFixture);

    // Get the owner's balance
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    // Expect the totalSupply to be equal to the owner's balance
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async () => {
    // Load the fixture and destructure the returned object
    const { add1, add2, hardhatToken } = await loadFixture(deployTokenFixture);

    // Transfer 50 tokens from owner to add1
    await hardhatToken.transfer(add1.address, 50);
    // Expect the balance of add1 to be 50
    expect(await hardhatToken.balanceOf(add1.address)).to.equal(50);

    // Transfer 15 tokens from add1 to add2 using add1's signer
    await hardhatToken.connect(add1).transfer(add2.address, 15);
    // Get the balance of add2
    const add2Balance = await hardhatToken.balanceOf(add2.address);
    // Log the balance of add2
    console.log("the add2 balance is--------->", add2Balance);

    // Expect the balance of add2 to be 15
    expect(add2Balance).to.equal(15);
  });
});