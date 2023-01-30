const { ethers, run, network } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Log the deployer's account balance
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Get the contract factory for the "Token" contract
  const Token = await ethers.getContractFactory("Token");

  // Deploy the "Token" contract with an initial supply of 1,000,000 tokens
  const token = await Token.deploy(1000000);

  // Log the deployed contract's address
  console.log("Token address:---------------->>", token.address);

  // Log the network details
  console.log("the network details----------->", await network);

  // Check if the network is not "hardhat"
  if (network.name != "hardhat") {
    // Wait for the deployment transaction to be mined
    await token.deployTransaction.wait(5);
    // Verify the contract with the contract address and constructor arguments
    await verify(token.address, [1000000]);
  }
}

// Verify the contract by running the "verify:verify" command and passing the contract address and constructor arguments
const verify = async (contractAddress, args) => {
  console.log("verifying contract-------->>>");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    // If the contract is already verified, log an error message
    if (error.message.toLowerCase().includes("already verified")) {
      console.error("Aleady Verified");
    } else {
      console.error(error.message);
    }
  }
};

// Run the main function and exit with a code of 0 if successful, 1 if there is an error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
