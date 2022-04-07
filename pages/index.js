// import styles from "../styles/Home.module.css";
import PrimarySearchAppBar from "../components/home/Appbar"
import Slider from "../components/home/Slider"
import HomeCard from "../components/home/HomeCard"
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

import { ethers, Contract } from 'ethers'
import FactoryArtifact from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export default function Home() {
  const { isAuthenticated } = useMoralis();
  const [campaigns, setCampaigns] = useState([]);
  async function _intializeContract(init, artifacts, address) {
    const contract = new Contract(
      address,
      artifacts,
      init
    );

    return contract
  }

  async function _getCampaigns(contract) {
    let list = await contract.functions.getDeployedCampaigns()
    // console.log(list)
    let final_list = []
    for (let i = 0; i < list[0].length; i++) {
      let add = list[0][i]
      const campaignContract = await _intializeContract(customHttpProvider, CampaignArtifact.abi, add)
      let detail = await campaignContract.getDetails()
      // console.log("here",detail);
      detail = { ...detail, id: add }
      // detail.push(add)
      final_list.push(detail)
    }
    return final_list


  }

  const { logout, Moralis, user } = useMoralis();
  var customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  useEffect(async () => {



    if (isAuthenticated) {
      var account = user.attributes.accounts
      // console.log(account)


    }
    // console.log(customHttpProvider)
    const contract = await _intializeContract(customHttpProvider, FactoryArtifact.abi, contractAddress)
    let final = await _getCampaigns(contract)
    setCampaigns(final)
    // console.log(final)
    // console.log(final[0][0]);
    // // convert big number to ethers

    // console.log(ethers.utils.formatEther(final[0][0].toString()))
    // console.log(final[0][1].toString())
    // console.log(ethers.utils.formatEther(final[0][5].toString()))
  }, []);

  return (
    <div>

      <PrimarySearchAppBar isAuthenticated={isAuthenticated} />
      {/* <h2>Popular Campaigns</h2>
      <Slider />
      <div style={{ margin: "100px" }}></div> */}

      <h2>Recent Campaigns</h2>
      <CardCarousel campaigns={campaigns} />

      <div style={{ margin: "200px" }}></div>

      <h2>Other Campaigns</h2>
      <CardCarousel campaigns={campaigns} />

      <div style={{ margin: "100px" }}></div>


    </div >
  );
}