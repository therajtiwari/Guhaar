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

  // await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 1", "Description 1",
  // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  // await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 2", "Description 2",
  // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  // await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 3", "Description 3",
  // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  // await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 4", "Description 4",
  // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));
  // await campaignFactory.createCampaign(ethers.utils.parseEther("0.01") , "Campaign 5", "Description 5",
  // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg", ethers.utils.parseEther("1"));

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01") ,
    "Save the Tigers",
    "Help save the tigers",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBGRDsmxh6rqIpg4FdiGBik_8RzwpoiDNfA&usqp=CAU",
    ethers.utils.parseEther("5"),
    // "2025-06-01",
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01") ,
    "Prevent Forest Fires",
    "Help prevent forest fires",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwTm9HscE3oC7cQqImN4_2EKCGf7enDgiHQ&usqp=CAU",
    ethers.utils.parseEther("8"),
    // "2022-06-01",
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01") ,
    "Save the Earth",
    "Help save the earth",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQpFbgAqevfuH6zOTM2xh10UV9mqB3YZV9nA&usqp=CAU",
    ethers.utils.parseEther("10"),
    // "2023-06-01",
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01") ,
    "Protect Elephants",
    "Help protect elephants",
    "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    ethers.utils.parseEther("15"),
    // "2024-06-01",
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01") ,
    "Covid Relief Funds",
    "Support covid relief funds",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdv2l3d2FIlTG2eMGpzkvTLIZElJYtL073A&usqp=CAU",
    ethers.utils.parseEther("20"),
    // "2026-06-01",
  );


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
