const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    // console.log(owner);

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async () => {
    const [owner, add1, add2, add3] = await ethers.getSigners();


    const token = await ethers.getContractFactory("Token");
    const hardhatToken = await token.deploy();
    
    await hardhatToken.transfer(add1.address, 50);
    expect(await hardhatToken.balanceOf(add1.address)).to.equal(50);

    await hardhatToken.connect(add1).transfer(add2.address, 15);
    const add2Balance = await hardhatToken.balanceOf(add2.address);
    console.log("the add2 balance is--------->", add2Balance);

    expect(add2Balance).to.equal(15);



  });
});



