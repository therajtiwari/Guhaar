import PrimarySearchAppBar from "../components/home/Appbar";
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

import getCampaigns from "../components/getCampaigns.server";
import BigCardCarousel from "../components/home/BigCardCarousel";
import { Divider } from "@mui/material";

import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchedCampaigns, setSearchedCampaigns] = useState([]);

  const [currUser, setCurrUser] = useState(null);

  const [walletID, setWalletID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#6f49fd");

  const {
    Moralis,
    user,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts;
      // console.log("account is", account);
      setCurrUser(account);
      setWalletID(user.attributes.ethAddress);
      // console.log(user)
    }

    setLoading(true);

    const final = await getCampaigns(
      Moralis,
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    console.log(final);
    setLoading(false);
    setCampaigns(final);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      campaigns.map((campaign) => {
        if (
          campaign[2].toLowerCase().includes(searchQuery.toLowerCase()) &&
          !searchedCampaigns.includes(campaign)
        ) {
          setSearchedCampaigns([...searchedCampaigns, campaign]);
        }
      });
    } else {
      setSearchedCampaigns([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <PrimarySearchAppBar userinfo={currUser} handleSearch={handleSearch} />

      {loading ? (
        <div
          className="loader"
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BounceLoader
            color={color}
            loading={loading}
            css={override}
            size={120}
          />
        </div>
      ) : (
        <>
          {searchQuery.length > 0 ? (
            <>
              <h2 style={{ fontWeight: "normal" }}>
                Search Results for <b>'{searchQuery}'</b>
              </h2>
              <Divider />

              <CardCarousel
                campaigns={searchedCampaigns}
                style={{ margin: "auto" }}
              />
            </>
          ) : (
            <>
              <div className={styles.sectionWrapper}>
                <h2>Popular campaigns</h2>

                <BigCardCarousel campaigns={campaigns} />
              </div>
              <div className={styles.sectionWrapper}>
                <h2>Recent Campaigns</h2>
                <CardCarousel
                  campaigns={campaigns}
                  style={{ margin: "auto" }}
                />
              </div>

              <div className={styles.sectionWrapper}>
                <h2>Other Campaigns</h2>
                <CardCarousel campaigns={campaigns} />
              </div>
            </>
          )}
        </>
      )}
    </div>
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
