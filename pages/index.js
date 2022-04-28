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



import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Home() {
  const { isAuthenticated } = useMoralis();
  const [campaigns, setCampaigns] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  const [walletID, setWalletID] = useState(null);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#6f49fd");

  async function _getCampaigns(contract) {
    setLoading(true);
    let list = await contract.functions.getDeployedCampaigns()
    const price = await INRPrice();
    // console.log(list)
    let final_list = []
    for (let i = 0; i < list[0].length; i++) {
      let add = list[0][i]
      const campaignContract = await _intializeContract(null, false, add)
      let detail = await campaignContract.getDetails()
      // console.log("here",detail);
      detail = { ...detail, id: add, price: price }
      // console.log("det", detail);
      // detail.push(add)
      final_list.push(detail)
    }
    setLoading(false);
    return final_list

  }

  const { logout, Moralis, user } = useMoralis();

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts;
      console.log("account is", account);
      setCurrUser(account);
      setWalletID(user.attributes.ethAddress);
      // console.log(user)
    }

    // console.log(user.attributes)

    const contract = await _intializeContract(account)
    let final = await _getCampaigns(contract)
    setCampaigns(final)
    // console.log(final)

  }, [isAuthenticated]);

  return (
    <div>

      <PrimarySearchAppBar isAuthenticated={isAuthenticated} userinfo={currUser} />

      {
        loading ?
          <div className="loader" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <BounceLoader color={color} loading={loading} css={override} size={120} />
          </div> :
          (<>
            <div className={styles.sectionWrapper}>
              <h2>Your campaigns</h2>

              <BigCardCarousel campaigns={campaigns} />
            </div>
            <div className={styles.sectionWrapper}>
              <h2>Recent Campaigns</h2>
              <CardCarousel campaigns={campaigns} style={{ margin: "auto" }} />
            </div>

            <div className={styles.sectionWrapper}>
              <h2>Other Campaigns</h2>
              <CardCarousel campaigns={campaigns} />
            </div></>)
      }





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