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
import getCampaignsDonated from "../../components/getCampaignsdonated";
import getCreatedCampaigns from "../../components/getownerCampaigns";

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
  // const address = id.toString().toLowerCase();
  // console.log("id here",id);
  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState();
  // const [address, setAddress] = useState("0x6a3f8927E7fA9d8C103B9344aAE8cAE044f73007");
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);

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
        query.find({ useMasterKey: true }).then(function (results) {
          // console.log("Res", results);
          // console.log("username", results[0].attributes.username);
          // console.log("eth", results[0].attributes.ethAddress);
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

    // await getUdata();

    // console.log(user);
    // if(username !== undefined){
    //     setComponent(<ProfileCard username={username} address={address}/>)
    // }

    // await getUdata().then((res) => {
    //   console.log("res", res);
    //   // setUsername(res.get("username"));
    //   // setAddress(res.attributes.ethAddress);
    // });

    // await getUdata();

    // console.log(user);
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

    // let final2 = getMyCampaigns(final);
    // setCreatedCampaigns(final2);
    // console.log("created:",final2);

    let final2 = await getCreatedCampaigns(
      Moralis,
      router.query.id,
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    setCreatedCampaigns(final2);
    // console.log("created", final2);

    let final3 = await getCampaignsDonated(
      Moralis,
      router.query.id,
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    setDonatedCampaigns(final3);
    // console.log("donated", final3);
  }, [router.query.id]);


  return (
    <>
      <Nav isAuthenticated={isAuthenticated} />
      {router.query.id && <OProfileCard address={router.query.id} />}
      <CampaignList title="Campaigns" campaigns={createdCampaigns} />
      <CampaignList title="Supported Campaigns" campaigns={donatedCampaigns} />
    </>
  );
};

export default Profile;
