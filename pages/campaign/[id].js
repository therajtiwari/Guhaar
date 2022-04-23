import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styles from "../../styles/Campaign.module.css";
import { ethers, Contract } from "ethers";
import CampaignArtifact from "../../artifacts/contracts/Campaign.sol/Campaign.json";
import { useEffect } from "react";
import PrimarySearchAppBar from "../../components/home/Appbar";
import { useMoralis } from "react-moralis";
import fetch from "node-fetch"
import { InputAdornment } from '@mui/material';

import _intializeContract from "../../components/contractconnector";

// const responsive = {
//   xl: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 8
//   },
//   lg: {
//       breakpoint: { max: 3000, min: 1500 },
//       items: 4
//   },
//   md: {
//       breakpoint: { max: 1500, min: 1200 },
//       items: 3
//   },
//   sm: {
//       breakpoint: { max: 1200, min: 700 },
//       items: 2
//   },
//   xs: {
//       breakpoint: { max: 700, min: 0 },
//       items: 1
//   }
// };

export default function Home(props) {
  //   const { isAuthenticated } = useMoralis();
  const [convert, setConvert] = useState(null);
  const [details, setDetails] = useState(null);
  const [flag, setFlag] = useState(false);
  const { isAuthenticated } = useMoralis();
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (id != undefined) {
      const campaignContract = await _intializeContract(null, false, id);
      let details= await campaignContract.getDetails();
      const price=await INRPrice();
      if(flag==false)
      {
        details={...details,price:price}
        setFlag(true);
        setDetails(details);
        console.log(details);
      }
    }
  });

  return (
    details!=null?<div>
      <PrimarySearchAppBar isAuthenticated={isAuthenticated} />
      <Box sx={{ flexGrow: 1 }} className={styles.boxer}>
        {/* <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={10}
          className={styles.main}
        >
      <Grid item xs={12} className={styles.test}>
          <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBGRDsmxh6rqIpg4FdiGBik_8RzwpoiDNfA&usqp=CAU"
        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt="Banner Image"
        loading="lazy"
        className={styles.imager}
        />
        </Grid> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={12}
            className={styles.main}
          >
            <Grid item xl={5} lg={5} md={6} sm={6} xs={12}>
              <Stack>
                <Typography
                  variant="h3"
                  fontWeight={"bold"}
                  gutterBottom
                  component="div"
                >
                  {/* Covid Relief Fund */}
                  {details[2]}
                </Typography>
                <img
        src={details[4]}
        alt="Banner Image"
        loading="lazy"
        className={styles.imager}
        />
                <Typography variant="subtitle1" gutterBottom component="div" className={styles.grey}>
                  {/* This Campaign is to Donate Funds for Covid Relief in India,
                  the situation. The manager is
                  https://twitter.com/harshbadhai28 and all the receives will go
                  to ABCD Foundation which will help in buying, delivering
                  oxygen, and other covid related help. If you want to withdraw
                  funds from this campaign please feel free to create a request,
                  and ping me on Twitter so that I can help you get the funds as
                  soon as possible. */}
                  {details[3]}
                </Typography>
              </Stack>
              <br />
              <Grid
                container
                wrap="nowrap"
                direction="column"
                alignItems="stretch"
                gap={2}
              >
                <Grid item>
                  <Card style={{ border: "1px solid" }}>
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        Minimum Contribution
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        component="div"
                      >
                        {ethers.utils.formatEther(details[0])} ETH (₹{parseFloat(details['price']*ethers.utils.formatEther(details[0])).toFixed(2)})
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Card style={{ border: "1px solid" }}>
                    <CardContent>
                      <Typography variant="subtitle1" component="div" noWrap>
                        Wallet Address of Campaign Creator
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        component="div"
                        noWrap
                      >
                        {/* 0x5d7676dB6119Ed1F6C696419058310D16a734d */}
                        {id}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card style={{ border: "1px solid" }}>
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        Number of Requests
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        component="div"
                      >
                        5
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card style={{ border: "1px solid" }}>
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        Number of Approvers
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        component="div"
                      >
                        {/* 20 */}
                        {ethers.utils.formatUnits(details[0]).split('.')[0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={5} lg={5} md={6} sm={6} xs={12} width={"100%"}>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                gap={4}
                className={styles.another}
              >
                <Grid item>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        Campaign Balance
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        component="div"
                      >
                        {/* 12.75 ETH($35751.51) */}
                        5 ETH <span className={styles.grey}>(₹{5*details['price']})</span>
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        {/* target of 11999 ETH ($33645675.96) */}
                        target of {ethers.utils.formatEther(details[5]).split('.')[1]>0?ethers.utils.formatEther(details[5]):ethers.utils.formatEther(details[5]).split('.')[0]} ETH (₹{parseFloat(ethers.utils.formatEther(details[5])*details['price']).toFixed(2)})
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(5/ethers.utils.formatEther(details[5]))*100}
                      ></LinearProgress>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Contribute Now!
                      </Typography>
                      <br/>
                      <Box sx={{ width: "100%" }}>
                        <form>
                          <FormControl id="value" style={{ width: "100%" }}>
                            <FormLabel>
                              Amount in Ether you want to contribute
                            </FormLabel>
                            <Input
                              type="number"
                              step="any"
                              min="0"
                              endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
                              onChange={(e) => {
                                setConvert(Math.abs(e.target.value));
                              }}
                            />
                          </FormControl>
                          {convert ? (
                            <FormHelperText><span className={styles.grey}>{parseFloat(convert*details["price"]).toFixed(2)}</span></FormHelperText>
                          ) : null}
                        </form>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <CardContent>
                      <Button
                        variant="contained"
                        href="#"
                        style={{ width: "100%" }}
                      >
                        View Withdrawal Request
                      </Button>
                      <Typography variant="body1" component="div">
                        * You can see where these funds are being used & if you
                        have contributed you can also approve those Withdrawal
                        Requests :)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        {/* </Grid> */}
      </Box>
    </div>:""
  );
}


const INRPrice = async ()=>{
    try{
        const response= await fetch("https://api.coinstats.app/public/v1/tickers?exchange=WazirX&pair=ETH-INR")
        const value= await response.json()
        return value['tickers'][0]['price'];
    }catch(e)
    {
        console.log(e);
    }
}