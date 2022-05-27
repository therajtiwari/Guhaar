const { expect } = require("chai");
const { ethers } = require("hardhat");
// import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";
const CampaignArtifact = require("../artifacts/contracts/Campaign.sol/Campaign.json");
// console.log(CampaignArtifact);
describe("CampaignFactory", function () {
  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();
  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();
  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});

describe("CampaignRequest", function () {
  it("Should create new request if address matches", async function () {
    const Greeter = await ethers.getContractFactory("CampaignFactory");
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    await greeter.createCampaign(
      (minimum = 0),
      (name = "save_girl"),
      (description = "nsaodfnoiasndc"),
      (imageUrl = "http://oasndfosn.com"),
      (target = 1),
      (category = "oas ndfcnf"),
      (lastdate = 0)
    );

    const details = await greeter.getDeployedCampaigns();
    const curr = details[0];
    // console.log(curr);
    // console.log(CampaignArtifact);
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Campaign = new ethers.Contract(
      curr,
      CampaignArtifact.abi,
      ethers.getSigners[0]
    );
    // console.log(owner);
    await Campaign.connect(owner).createRequest(
      (description = "nsaodfnoiasndc"),
      (value = ethers.utils.parseEther("0"))
    );

    // expect(await greeter.createRequest(
    //   {}
    // ))

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // // wait until the transaction is mined
    // await setGreetingTx.wait();
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
