import styles from "../../styles/Profile.module.css";
import { useState, useEffect } from 'react';
import { Typography, Container, Card, CardMedia, Grid, CardContent, TextField, Box } from "@mui/material";
import CampaignCard from "./campaignCard";


const CampaignList = ( { title } ) => {
    return ( 
        <div className={styles.wrapper}>
            <h1 style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#606060",
               }}>{ title }</h1>
            <CampaignCard />
            <CampaignCard />
        </div>
     );
}
 
export default CampaignList;