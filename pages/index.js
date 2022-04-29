
import PrimarySearchAppBar from "../components/home/Appbar"
import Slider from "../components/home/Slider"
import HomeCard from "../components/home/HomeCard"
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";


import getCampaigns from "../components/getCampaigns";
import BigCardCarousel from "../components/home/BigCardCarousel";



import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  const [walletID, setWalletID] = useState(null);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#6f49fd");

  const { Moralis, user, isWeb3Enabled, isAuthenticated,isAuthenticating, isWeb3EnableLoading } = useMoralis();

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts;
      console.log("account is", account);
      setCurrUser(account);
      setWalletID(user.attributes.ethAddress);
      // console.log(user)
    }

    setLoading(true);
    
    let final = await getCampaigns(Moralis,isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)
    console.log(final)
    setLoading(false);
    setCampaigns(final)

  }, [isAuthenticated]);

  return (
    <div>

      <PrimarySearchAppBar userinfo={currUser} />

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