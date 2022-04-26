// import styles from "../styles/Home.module.css";
import PrimarySearchAppBar from "../components/home/Appbar"
import Slider from "../components/home/Slider"
import HomeCard from "../components/home/HomeCard"
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";


import _intializeContract from "../components/contractconnector";
import BigCardCarousel from "../components/home/BigCardCarousel";

export default function Home() {
  const { isAuthenticated } = useMoralis();
  const [campaigns, setCampaigns] = useState([]);


  async function _getCampaigns(contract) {
    let list = await contract.functions.getDeployedCampaigns()
    const price=await INRPrice();
    // console.log(list)
    let final_list = []
    for (let i = 0; i < list[0].length; i++) {
      let add = list[0][i]
      const campaignContract = await _intializeContract(null, false, add)
      let detail = await campaignContract.getDetails()
      // console.log("here",detail);
      detail = { ...detail, id: add,price: price }
      // console.log("det", detail);
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
    // console.log(user.attributes)

    const contract = await _intializeContract(account)
    let final = await _getCampaigns(contract)
    setCampaigns(final)
    console.log(final)

  }, []);

  return (
    <div>

      <PrimarySearchAppBar isAuthenticated={isAuthenticated} />
      <div className={styles.sectionWrapper}>
        <h2>Your campaigns</h2>
        {/* <CardCarousel campaigns={campaigns} style={{ margin: "auto" }} />
         */}
        <BigCardCarousel campaigns={campaigns} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Recent Campaigns</h2>
        <CardCarousel campaigns={campaigns} style={{ margin: "auto" }} />
      </div>

      <div className={styles.sectionWrapper}>
        <h2>Other Campaigns</h2>
        <CardCarousel campaigns={campaigns} />
      </div>





    </div >
  );
}

const INRPrice = async () => {
  try {
    const response = await fetch(
      "https://api.coinstats.app/public/v1/tickers?exchange=WazirX&pair=ETH-INR"
    );
    const value = await response.json();
    return value["tickers"][0]["price"];
  } catch (e) {
    console.log(e);
  }
};