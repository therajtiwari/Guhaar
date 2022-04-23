import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';;
import Nav from "../../components/Nav.js";
import { useMoralis } from "react-moralis";
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";

const ProfileCard = () => {
    return ( 
        <div className={styles.wrapper}>
               <h1 style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#606060",
               }}>My Profile</h1>
                <div className={styles.profileContainer}>
                        <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="profile" 
                        style={{
                            width: "160px",
                            height: "160px",
                            borderRadius: "50%",
                            margin: "0 auto",
                            marginBottom: "10px",
                        }}/>
                        <div className="Details">
                            <Grid container spacing={5}>
                                {/* <Grid xs={12} sm={6} item fullWidth>
                                <h3 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    color: "#606060",
                                    border: "1px solid #606060",
                                    borderRadius: "5px",
                                }}>name</h3>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                <p style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    color: "#606060",
                                }}>email</p>
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                <p style={{
                                    fontSize: "1.25rem",
                                    color: "#606060",
                                }}>walletaddress</p>
                                </Grid> */}
                                <Grid xs={12} sm={6} item>
                                    <TextField label="Username" variant="outlined" value={"Axon"} fullWidth inputMode="none"/>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField label="Email" variant="outlined" value={"anon@gmail.com"} fullWidth/>
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    <TextField label="Wallet Address" variant="outlined" value={"0x0ADWDJWAFHI2U87EI2UAUF7W"} fullWidth/>
                                </Grid>
                            </Grid>
                        </div>
                </div> 
            </div>
     );
}
 
export default ProfileCard;