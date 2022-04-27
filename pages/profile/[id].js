import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";
import _intializeContract from "../../components/contractconnector";


const Profile = () => {
    const { isAuthenticated, user } = useMoralis();
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

    

    async function _getCampaigns(contract) {
        let list = await contract.functions.getDeployedCampaigns()
        let final_list = []
        for (let i = 0; i < list[0].length; i++) {
          let add = list[0][i]
          const campaignContract = await _intializeContract(null, false, add)
          let detail = await campaignContract.getDetails()
          detail = { ...detail, id: add }
          final_list.push(detail)
        }
        return final_list
      }

    useEffect(async () => {
        if (isAuthenticated) {
          var account = user.attributes.accounts
        }
        // console.log(user)
      
        const contract = await _intializeContract(account)
        let final = await _getCampaigns(contract)
        setCampaigns(final)
        console.log(final)

        const userData = await fetch();
        console.log("user",userData);
        // console.log(userData.get("username"));
        // console.log(userData.attributes.ethAddress);
    }, [fetch]);

    return ( 
        <>
            <Nav isAuthenticated={isAuthenticated} />
            <ProfileCard username={username} address={address}/>
            <CampaignList title="My Campaigns" campaigns={campaigns.slice(0,campaigns.length/2)} />
            <CampaignList title="Supported Campaigns" campaigns={campaigns.slice(campaigns.length/2,campaigns.length)} />
        </>
     );
}
 
export default Profile;