import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";

const Profile = () => {
    const { isAuthenticated, user } = useMoralis();
    const router = useRouter();
    const id = router.query.id;
    // console.log("id:",id);

    useEffect(async () => {
        if (isAuthenticated) {
          var account = user.attributes.accounts
        }
        console.log(user)
      
    }, []);

    return ( 
        <>
            <Nav isAuthenticated={isAuthenticated} />
            <ProfileCard />
            <CampaignList title="My Campaigns"/>
            <CampaignList title="Supported Campaigns"/>
        </>
     );
}
 
export default Profile;