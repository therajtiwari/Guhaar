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
import getCampaignsDonated from "../../components/getCampaignsdonated";
import Loading from "../../components/Loading";

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
  const [createdCampaigns, setCreatedCampaigns] = useState([]);

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
      if (campaigns[i][10].toLowerCase() == address) {
        // console.log("This is the campaign", campaigns[i]);
        campaign.push(campaigns[i]);
      }
    }

    return campaign;
  };
  useEffect(async () => {
    if (isAuthenticated && user) {
      if (isAuthenticated) {
        var account = user.attributes.accounts;
        setUsername(user.get("username"));
        setAddress(user.attributes.ethAddress);
        // console.log("add here",address);
        let final3 = await getCampaignsDonated(
          Moralis,
          address,
          isWeb3Enabled,
          isAuthenticating,
          isWeb3EnableLoading
        );
        setDonatedCampaigns(final3);
        console.log("donated campaign", final3);
      }

      // console.log(user);
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

      let final2 = getMyCampaigns(final);
      setCreatedCampaigns(final2);
    }
  }, [isAuthenticated, address]);

  return (
    <>
      <Nav />
      {username && <ProfileCard username={username} address={address} />}
      {/* {component} */}
      <CampaignList title="Campaigns" campaigns={createdCampaigns} />
      <CampaignList title="Supported Campaigns" campaigns={donatedCampaigns} />
      {/* {username && (address !== undefined) && <><ProfileCard username={username} address={address} /><CampaignList title="Campaigns" campaigns={createdCampaigns} /><CampaignList
        title="Supported Campaigns"
        campaigns={donatedCampaigns} /></>}
      {(address === undefined) && <Loading />} */}
    </>
  );
};

export default Profile;