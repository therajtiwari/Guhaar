import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";
import getCampaigns from "../../components/getCampaigns";


const Profile = () => {
    const { user, Moralis, isWeb3Enabled, isAuthenticated,isAuthenticating, isWeb3EnableLoading } = useMoralis();
    const router = useRouter();
    const id = router.query.id;
    console.log(id);
    const [campaigns, setCampaigns] = useState([]);
    const [username, setUsername] = useState();
    const [address, setAddress] = useState();
    const { fetch, data, error, isLoading } = useMoralisQuery(
      "Users",
      (query) => query.equalTo("ethAddress", id),
      [],
      { autoFetch: false }
    );

    

    useEffect(async () => {
        if (isAuthenticated) {
          var account = user.attributes.accounts
        }

        let final = await getCampaigns(Moralis,isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)
        setCampaigns(final)
        console.log(final)

        const userData = await fetch();
        console.log("user",userData);
        // console.log(userData.get("username"));
        // console.log(userData.attributes.ethAddress);
    }, [fetch]);

    return ( 
        <>
            <Nav/>
            <ProfileCard username={username} address={address}/>
            <CampaignList title="My Campaigns" campaigns={campaigns.slice(0,campaigns.length/2)} />
            <CampaignList title="Supported Campaigns" campaigns={campaigns.slice(campaigns.length/2,campaigns.length)} />
        </>
     );
}
 
export default Profile;