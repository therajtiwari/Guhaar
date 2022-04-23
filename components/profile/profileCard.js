import styles from "../../styles/Profile.module.css";
import { useState, useEffect } from 'react';
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { RemoveRedEye } from "@mui/icons-material";


const ProfileCard = () => {
    const [showAddress, setShowAddress] = useState("password");

    const handleShowAddress = () => {
        setShowAddress(showAddress === "password" ? "text" : "password");
    };

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
                            marginBottom: "20px",
                        }}/>
                        <div className="Details">
                            <Grid container spacing={5}>
                                <Grid xs={12} sm={6} item>
                                    <TextField label="Username" variant="outlined" value={"Axon"} fullWidth inputMode="none"/>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <TextField label="Email" variant="outlined" value={"anon@gmail.com"} fullWidth/>
                                </Grid>
                                <Grid xs={12} sm={12} item>
                                    <TextField label="Wallet Address" variant="outlined" value={"0x0ADWDJWAFHI2U87EI2UAUF7W"} type={showAddress} fullWidth
                                    InputProps={{
                                        endAdornment:
                                          <InputAdornment position="end">
                                              <IconButton aria-label="upload picture" component="span" onClick={() => handleShowAddress()}>
                                                < RemoveRedEye />
                                              </IconButton>
                                          </InputAdornment>,
                                      }}
                                    />
                                </Grid>
                                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                            </Grid>
                        </div>
                </div> 
            </div>
     );
}
 
export default ProfileCard;