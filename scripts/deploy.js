// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const ethers = require("ethers");

function dateToUnix(date) {
  date = new Date(date);
  return date.getTime() / 1000;
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CampaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );
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
    ethers.utils.parseEther("0.01"),
    "Save the Tigers",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBGRDsmxh6rqIpg4FdiGBik_8RzwpoiDNfA&usqp=CAU",
    "https://wallpaperaccess.com/full/1944065.jpg",
    ethers.utils.parseEther("2"),
    "Environment",
    dateToUnix("2023-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Help for higher education",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    "https://wallpaperaccess.com/full/7137675.jpg",
    ethers.utils.parseEther("3"),
    "Education",
    dateToUnix("2022-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Funds for preserving nature",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    "https://science.oregonstate.edu/sites/science.oregonstate.edu/files/styles/882_x_662/public/2021-02/int-students-osu.png?h=232d5ff5&itok=ES5zN9eJ",
    ethers.utils.parseEther("2"),
    "Nature",
    dateToUnix("2025-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Funds to save the forests ",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    "https://wallpaperaccess.com/full/1261630.jpg",
    ethers.utils.parseEther("1"),
    "Nature",
    dateToUnix("2024-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Save the environment",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    "https://wallpaperaccess.com/full/1261827.jpg",
    ethers.utils.parseEther("5"),
    "Nature",
    dateToUnix("2021-06-01")
  );

  var deplist = await campaignFactory.getDeployedCampaigns();
  console.log(deplist);
  // end testing

  console.log("campaignFactory deployed to:", campaignFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
