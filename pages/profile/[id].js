import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Nav from "../../components/Nav.js";
import { useMoralis, useMoralisQuery } from "react-moralis";
import {
  Typography,
  Container,
  Card,
  Grid,
  CardContent,
  TextField,
} from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";

import OProfileCard from "../../components/profile/oprofileCard";
import getCampaigns from "../../components/getCampaigns.server";

const Profile = () => {
  const {
    user,
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const { fetch, data, error, isLoading } = useMoralisQuery(
    "_User",
    (query) => query.equalTo("ethAddress", id),
    [],
    { autoFetch: false }
  );

  const getUdata = async () => {
    // Moralis.Query("_User" )
    try {
      if (id !== undefined) {
        const Monster = Moralis.Object.extend("_User");
        const query = new Moralis.Query(Monster);
        query.equalTo("ethAddress", id.toLowerCase());
        query.find().then(function (results) {
          console.log("Res", results);
          console.log("username", results[0].attributes.username);
          console.log("eth", results[0].attributes.ethAddress);
          setUsername(results[0].get("username"));
          setAddress(results[0].get("ethAddress"));
          // return results[0];
        });
        // console.log("res",results[0].get("username"));
        // return results[0];
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMyCampaigns = (campaigns) => {
    const campaign = [];
    for (let i = 0; i < campaigns.length; i++) {
      if (campaigns[i][10] === address) {
        campaign.push(campaigns[i]);
      }
    }
    return campaign;
  };

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts;
      // setUsername(user.get("username"));
      // setAddress(user.attributes.ethAddress);
    }

    await getUdata();

    console.log(user);
    // if(username !== undefined){
    //     setComponent(<ProfileCard username={username} address={address}/>)
    // }

    // await getUdata().then((res) => {
    //   console.log("res", res);
    //   // setUsername(res.get("username"));
    //   // setAddress(res.attributes.ethAddress);
    // });

    await getUdata();

    console.log(user);
    // if (username !== undefined) {
    //   setComponent(<ProfileCard username={username} address={address} />);
    // }

    let final = await getCampaigns(
      Moralis,
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    setCampaigns(final);
    // console.log(final)
  }, []);

  return (
    <>
      <Nav isAuthenticated={isAuthenticated} />
      {username && <OProfileCard username={username} address={address} />}
      <CampaignList title="Campaigns" campaigns={getMyCampaigns(campaigns)} />
      <CampaignList
        title="Supported Campaigns"
        campaigns={campaigns.slice(campaigns.length / 2, campaigns.length)}
      />
    </>
  );
};

export default Profile;
