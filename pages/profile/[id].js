import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import ProfileCard from "../../components/profile/profileCard";
import CampaignList from "../../components/profile/camapaignList";

import OProfileCard from "../../components/profile/oprofileCard";
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

      const getUdata = async () => { 
        // Moralis.Query("_User" )
        try{
          if (id !== undefined) {
            const Monster = Moralis.Object.extend("_User");
            const query = new Moralis.Query(Monster);
            await query.equalTo("ethAddress", id);
            const results = await query.find().then(function(results) {
              console.log("Res",results);
              return results[0];
            });
            // console.log("res",results[0].get("username"));
            return results[0];
          }
        } catch(err){
          console.log(err);
        }
      }

      const getMyCampaigns = (campaigns) => {
        const campaign = []
        for (let i = 0; i < campaigns.length; i++) {
          if (campaigns[i][10] === address) {
              campaign.push(
                  campaigns[i]
              ) 
          }
       }
        return campaign;
     }


      useEffect(async () => {
        if (isAuthenticated) {
            var account = user.attributes.accounts
            // setUsername(user.get("username"));
            // setAddress(user.attributes.ethAddress);
        }

        await getUdata().then(res => {
          console.log("res",res);
          // setUsername(res.get("username"));
          // setAddress(res.attributes.ethAddress);
        });

        console.log(user)
        if(username !== undefined){
            setComponent(<ProfileCard username={username} address={address}/>)
        }

        let final = await getCampaigns(Moralis,isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)
        setCampaigns(final)
        // console.log(final)
    }, []);


    return ( 
        <>
            <Nav isAuthenticated={isAuthenticated} />
            {username && <OProfileCard username={username} address={address}/>}
            <CampaignList title="My Campaigns" campaigns={getMyCampaigns(campaigns)} />
            <CampaignList title="Supported Campaigns" campaigns={campaigns.slice(campaigns.length/2,campaigns.length)} />
        </>
     );
}
 
export default Profile;