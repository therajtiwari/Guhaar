// import styles from "../styles/Home.module.css";
import PrimarySearchAppBar from "../components/home/Appbar"
import Slider from "../components/home/Slider"
import HomeCard from "../components/home/HomeCard"
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";


import _intializeContract from "./api/utils/contractconnector";


export default function Home() {
  const { isAuthenticated } = useMoralis();
  const [campaigns, setCampaigns] = useState([]);


  async function _getCampaigns(contract) {
    let list = await contract.functions.getDeployedCampaigns()
    // console.log(list)
    let final_list = []
    for (let i = 0; i < list[0].length; i++) {
      let add = list[0][i]
      const campaignContract = await _intializeContract(null, false, add)
      let detail = await campaignContract.getDetails()
      // console.log("here",detail);
      detail = { ...detail, id: add }
      // detail.push(add)
      final_list.push(detail)
    }
    return final_list


  }

  const { logout, Moralis, user } = useMoralis();

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts
    }

    const contract = await _intializeContract(account)
    let final = await _getCampaigns(contract)
    setCampaigns(final)
    console.log(final)

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