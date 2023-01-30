const { task } = require("hardhat/config");

task("messageTask", "prints the secret message---------->")
  .addParam("message", "the message to be displayed")
  .setAction(async (taskArgs) => {
   console.log("hello !!!! the secret message is ----------->", taskArgs.message);
  });
