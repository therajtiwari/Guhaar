import styles from "../../styles/Profile.module.css";
import { useState, useEffect } from 'react';
import { Typography, Container, Card, Grid, CardContent, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { CopyAll, Edit, RemoveRedEye } from "@mui/icons-material";
import { AvatarGenerator } from 'random-avatar-generator';
import UserModal from "./usernameModal";

import { useMoralis } from "react-moralis";

const generator = new AvatarGenerator();



const ProfileCard = ({username,address}) => {
    const { isAuthenticated, user, Moralis } = useMoralis();
    const [showAddress, setShowAddress] = useState("password");
    
    // const username = user.get("username");
    // const email = "anon@gmail.com";
    // const address = "0x0000000000000000000000000000000000000000";
    const image = generator.generateRandomAvatar(username);

    const handleShowAddress = () => {
        setShowAddress(showAddress === "password" ? "text" : "password");
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address);
    };
    
    return (
        // Modal(), 
        <div className={styles.wrapper}>
               <h1 style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#606060",
               }}>My Profile</h1>
                <div className={styles.profileContainer}>
                        <img src={image} alt="profile" 
                        style={{
                            width: "160px",
                            height: "160px",
                            borderRadius: "50%",
                            margin: "0 auto",
                            marginBottom: "20px",
                        }}/>
                        <div className="Details">
                            <Grid container spacing={5}>
                                <Grid xs={12} sm={12} item>
                                    <TextField label="Username" variant="outlined" value={username} fullWidth inputMode="none" disabled={true}
                                    InputProps={{
                                        endAdornment:
                                          <InputAdornment position="end">
                                              {/* <IconButton aria-label="upload picture" component="span" >
                                                < Edit />
                                              </IconButton> */}
                                              < UserModal value={username}/>
                                          </InputAdornment>,
                                      }}
                                    />
                                </Grid>
                                {/* <Grid xs={12} sm={12} item>
                                    <TextField label="Email" variant="outlined" value={email} fullWidth disabled={true}/>
                                </Grid> */}
                                <Grid xs={12} sm={12} item>
                                    <TextField label="Wallet Address" variant="outlined" value={address} fullWidth disabled={true}
                                    InputProps={{
                                        endAdornment:
                                          <InputAdornment position="end">
                                              <IconButton aria-label="upload picture" component="span" onClick={handleCopyAddress} >
                                                < CopyAll />
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