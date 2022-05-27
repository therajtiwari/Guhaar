import PrimarySearchAppBar from "../components/home/Appbar";
import CardCarousel from "../components/home/CardCarousel";

import { useEffect, useState } from "react";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";
import moment from "moment";
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
  const [trendingCampaigns, setTrendingCampaigns] = useState([]);
  const [popularCampaigns, setPopularCampaigns] = useState([]);
  const [workingCampaigns, setWorkingCampaigns] = useState([]);
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#6f49fd");

  // const sortFunction = (a, b, i) => {
  //   if (a[i] === b[i]) {
  //       return 0;
  //   }
  //   else {
  //       return (a[i] < b[i]) ? -1 : 1;
  //   }
  // }

  // function sortFunction(a, b) {
  //   if (a[8] === b[8]) {
  //       return 0;
  //   }
  //   else {
  //       return (a[8] < b[8]) ? -1 : 1;
  //   }
  // }

  const getWorking = (campaigns) => {
    let c = [];
    for (let i = 0; i < campaigns.length; i++) {
      const lastDay = new Date(campaigns[i][7] * 1000);
      const daysLeft = moment(lastDay).diff(moment(), "days");
      if (daysLeft > 0) {
        c.push(campaigns[i]);
      }
    }
    return c;
  };

  const {
    Moralis,
    user,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

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
    console.log("final is", final);
    setLoading(false);
    // setCampaigns(final);

    const trending = final.sort((a, b) => {
      return b[8] - a[8];
    });
    // console.log("trending sorted", trending.slice(0, 1));
    setTrendingCampaigns(trending.slice(0, 4));

    const popular = final.sort((a, b) => {
      return b[9] - a[9];
    });
    // console.log("popular sorted", popular);

    const temp = popular;
    setPopularCampaigns(temp.slice(0, temp.length));


    shuffleArray(final);
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
                <h2>Trending campaigns</h2>
                <BigCardCarousel campaigns={trendingCampaigns} />
              </div>
              <div className={styles.sectionWrapper}>
                <h2>Popular Campaigns</h2>
                <CardCarousel
                  campaigns={popularCampaigns}
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
    // console.log(e);
  }
};
