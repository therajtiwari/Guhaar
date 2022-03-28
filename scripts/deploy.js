// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  // for testing

  await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 1", "Description 1",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 2", "Description 2",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 3", "Description 3",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 4", "Description 4",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 5", "Description 5",
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));


  var deplist = await campaignFactory.getDeployedCampaigns()
  console.log(deplist)
  // end testing

  console.log("campaignFactory deployed to:", campaignFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
