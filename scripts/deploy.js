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
    ethers.utils.parseEther("0.01"),
    "Save the Tigers",
    "Help save the tigers",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBGRDsmxh6rqIpg4FdiGBik_8RzwpoiDNfA&usqp=CAU",
    "https://wallpaperaccess.com/full/1944065.jpg",
    ethers.utils.parseEther("5"),
    "Environment",
    dateToUnix("2023-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Prevent Forest Fires",
    "Help prevent forest fires",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwTm9HscE3oC7cQqImN4_2EKCGf7enDgiHQ&usqp=CAU",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/115a1387-7ea4-44c9-976d-fdb553d26fa1/daj3us9-59767aec-4776-4334-b3fe-456fe120c8e2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExNWExMzg3LTdlYTQtNDRjOS05NzZkLWZkYjU1M2QyNmZhMVwvZGFqM3VzOS01OTc2N2FlYy00Nzc2LTQzMzQtYjNmZS00NTZmZTEyMGM4ZTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ozDqFpHkSnGFHO0Xc5uNnlO2DK7JpmTdVg2vFzaN4rE",
    ethers.utils.parseEther("8"),
    "Environment",
    dateToUnix("2022-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Save the Earth",
    "Help save the earth",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQpFbgAqevfuH6zOTM2xh10UV9mqB3YZV9nA&usqp=CAU",
    "https://science.oregonstate.edu/sites/science.oregonstate.edu/files/styles/882_x_662/public/2021-02/int-students-osu.png?h=232d5ff5&itok=ES5zN9eJ",
    ethers.utils.parseEther("10"),
    "International",
    dateToUnix("2025-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Protect Elephants",
    "Help protect elephants",
    // "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/771c8bf5-b34c-48b2-b085-12f55d52cb0f/d4xcx1v-97a3b54b-630c-4074-b2b7-85a03ce2884d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc3MWM4YmY1LWIzNGMtNDhiMi1iMDg1LTEyZjU1ZDUyY2IwZlwvZDR4Y3gxdi05N2EzYjU0Yi02MzBjLTQwNzQtYjJiNy04NWEwM2NlMjg4NGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.k_GjlCe4RBtAWMUIUB4pp4WNs9tvS8rIljSMYRj587Y",
    ethers.utils.parseEther("15"),
    "Local",
    // "2024-06-01",
    dateToUnix("2024-06-01")
  );

  await campaignFactory.createCampaign(
    ethers.utils.parseEther("0.01"),
    "Covid Relief Funds",
    "Support covid relief funds",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdv2l3d2FIlTG2eMGpzkvTLIZElJYtL073A&usqp=CAU",
    "https://www.wattagnet.com/ext/resources/Images-by-month-year/20_03/covid-19-global-pandemic.jpg?height=635&t=1588379687&width=1200",
    ethers.utils.parseEther("20"),
    "Health",
    dateToUnix("2021-06-01")
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
