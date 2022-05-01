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
import getCampaigns from "../../components/getCampaigns.server";
// import getCampaignsDonated from "../../components/getCampaignsdonated";

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
  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState();
  const [address, setAddress] = useState();
  const [component, setComponent] = useState(<></>);
  const [donatedCampaigns, setDonatedCampaigns] = useState([]);

  async function _getCampaigns(contract) {
    let list = await contract.functions.getDeployedCampaigns();
    let final_list = [];
    for (let i = 0; i < list[0].length; i++) {
      let add = list[0][i];
      const campaignContract = await _intializeContract(null, false, add);
      let detail = await campaignContract.getDetails();
      detail = { ...detail, id: add };
      final_list.push(detail);
    }
    return final_list;
  }

  if (username !== undefined) {
    const component = <ProfileCard username={username} address={address} />;
  }

  const getMyCampaigns = (campaigns) => {
    const campaign = [];
    for (let i = 0; i < campaigns.length; i++) {
        // console.log(campaigns[i][10], "And" , address);
        if (campaigns[i][10] ==+ address.toUpperCase()) {
            console.log("This is the campaign", campaigns[i]);
            campaign.push(campaigns[i]);
        }
    }
    return campaign;
  };

  useEffect(async () => {
    if (isAuthenticated) {
      var account = user.attributes.accounts;
      setUsername(user.get("username"));
      setAddress(user.attributes.ethAddress);
    }
    // console.log(user)
    console.log(user);
    if (username !== undefined) {
      setComponent(<ProfileCard username={username} address={address} />);
    }
    let final = await getCampaigns(
      Moralis,
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    setCampaigns(final);
    console.log(final);

    // let final2 = await getCampaignsDonated(
    //     Moralis,
    //     isWeb3Enabled,
    //     isAuthenticating,
    //     isWeb3EnableLoading
    // );
    
    // setDonatedCampaigns(final2);
    
    // console.log("donated",final2);

    let final2 = getMyCampaigns(final);
    setDonatedCampaigns(final2);

  }, [isAuthenticated]);

  return (
    <>
      <Nav />
      {username && <ProfileCard username={username} address={address} />}
      {/* {component} */}
      <CampaignList title="Campaigns" campaigns={donatedCampaigns} />
      <CampaignList
        title="Supported Campaigns"
        campaigns={campaigns.slice(campaigns.length / 2, campaigns.length)}
      />
    </>
  );
};

export default Profile;
