import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";
import getCampaigns from "../../components/getCampaigns";


const Profile = () => {
    const { user, Moralis, isWeb3Enabled, isAuthenticated,isAuthenticating, isWeb3EnableLoading } = useMoralis();
    const router = useRouter();
    const [campaigns, setCampaigns] = useState([]);
    const [username, setUsername] = useState();
    const [address, setAddress] = useState();

    useEffect(async () => {
        if (isAuthenticated) {
            var account = user.attributes.accounts
            setUsername(user.get("username"));
            setAddress(user.attributes.ethAddress);
        }
        // console.log(user)
      
        let final = await getCampaigns(Moralis, isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)
        setCampaigns(final)
        console.log(final)
    }, [isAuthenticated]);


    return ( 
        <>
            <Nav />
            <ProfileCard username={username} address={address}/>
            <CampaignList title="My Campaigns" campaigns={campaigns.slice(0,campaigns.length/2)} />
            <CampaignList title="Supported Campaigns" campaigns={campaigns.slice(campaigns.length/2,campaigns.length)} />
        </>
     );
}
 
export default Profile;