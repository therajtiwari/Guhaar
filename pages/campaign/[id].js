import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";
import Link from "next/link";
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
import Nav from "../../components/Nav";
import fetch from "node-fetch";
import { InputAdornment } from "@mui/material";
import { Divider } from "@mui/material";
import Router from "next/router";

import getCampaigndetails from "../../components/getCampaigndetails.server";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function Home(props) {
  const {
    user,
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();
  const [convert, setConvert] = useState(null);
  const [details, setDetails] = useState(null);
  // const [flag, setFlag] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (id != undefined) {
      let details = await getCampaigndetails(
        Moralis,
        id,
        isWeb3Enabled,
        isAuthenticating,
        isWeb3EnableLoading
      );
      const price = await INRPrice();

      if (details) {
        details = { ...details, price: price };
        // setFlag(true);
        setDetails(details);
      }
    }
  }, [id]);

  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();

  const handlePayment = async () => {
    await Moralis.authenticate();
    fetch({
      onComplete: (a) => console.log(a),
      onError: (a) => console.error(a.toString()),
      onSuccess: (a) => console.log(JSON.stringify(a)),
      params: {
        contractAddress: id,
        functionName: "contibute",
        abi: CampaignArtifact.abi,
        params: {
          wantToApprove: true, // option checkbox to approve
        },
        msgValue: ethers.utils.parseEther(convert.toString()),
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data, error);
  };

  return details != null ? (
    <div>
      <Nav />
      <Box sx={{ flexGrow: 1 }} className={styles.boxer}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="start"
          spacing={12}
          className={styles.main}
        >
          <Grid item xl={6} lg={6} md={6} sm={10} xs={12}>
            <Stack>
              <Typography
                variant="h3"
                fontWeight={"bold"}
                gutterBottom
                component="div"
                className={styles.title}
              >
                {details[2]}
              </Typography>
              <img
                src={details[4]}
                alt="Banner Image"
                loading="lazy"
                className={styles.imager}
              />
              <Typography
                mt={4}
                gutterBottom
                component="div"
                className={styles.subtitle}
              >
                {details[3]}
              </Typography>
            </Stack>
            <br />
            <Grid
              mt={6}
              container
              wrap="nowrap"
              direction="column"
              alignItems="stretch"
              gap={2}
            >
              <Grid item>
                <Typography fontWeight={"bold"} className={styles.infoText}>
                  Minimum Contribution
                </Typography>
                <Typography className={styles.infoText}>
                  {ethers.utils.formatEther(details[0])} ETH (₹
                  {parseFloat(
                    details["price"] * ethers.utils.formatEther(details[0])
                  ).toFixed(2)}
                  )
                </Typography>
              </Grid>
              <Divider mt={5} />

              <Grid item xs zeroMinWidth>
                <Typography className={styles.infoText} fontWeight={"bold"}>
                  Wallet Address of Campaign Creator
                </Typography>
                <Link href={`/profile/${details[10]}`}>
                  <Typography className={styles.infoText}>
                    {details[10]}
                  </Typography>
                </Link>
              </Grid>
              <Divider mt={5} />

              <Grid item>
                <Typography fontWeight={"bold"} className={styles.infoText}>
                  Number of Contributors
                </Typography>
                <Typography className={styles.infoText}>
                  {parseFloat(ethers.utils.formatEther(details[9])).toFixed(0)}
                </Typography>
              </Grid>
              <Divider mt={5} />
            </Grid>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={10} xs={12} width={"100%"}>
            <Grid container direction="column" alignItems="stretch" gap={4}>
              <Grid item className={styles.infoGrid}>
                <Card>
                  <CardContent className={styles.cardContent}>
                    <Typography variant="h6" fontWeight={"normal"}>
                      Campaign Balance
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={"bold"}
                      // component="div"
                    >
                      {ethers.utils.formatEther(details[8])} ETH{" "}
                      <span className={styles.grey}>
                        {ethers.utils.formatEther(details[8]) > 0
                          ? "(₹ " +
                            ethers.utils.formatEther(details[8]) *
                              details["price"] +
                            " )"
                          : ""}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="h6" fontWeight={"normal"} mb={2}>
                      {/* target of 11999 ETH ($33645675.96) */}
                      Target of{" "}
                      {ethers.utils.formatEther(details[5]).split(".")[1] > 0
                        ? ethers.utils.formatEther(details[5])
                        : ethers.utils
                            .formatEther(details[5])
                            .split(".")[0]}{" "}
                      ETH (₹
                      {parseFloat(
                        ethers.utils.formatEther(details[5]) * details["price"]
                      ).toFixed(2)}
                      )
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      className={styles.progressBarr}
                      value={
                        (ethers.utils.formatEther(details[8]) /
                          ethers.utils.formatEther(details[5])) *
                        100
                      }
                    ></LinearProgress>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent className={styles.cardContent}>
                    <Box sx={{ width: "100%" }}>
                      <form>
                        <FormControl id="value" style={{ width: "100%" }}>
                          <Typography variant="h6" component="div">
                            Amount in Ether you want to contribute
                          </Typography>
                          <Input
                            type="number"
                            min={0}
                            endAdornment={
                              <InputAdornment position="end">
                                ETH
                              </InputAdornment>
                            }
                            onChange={(e) => {
                              setConvert(e.target.value);
                            }}
                          />
                        </FormControl>
                        {convert > 0 ? (
                          <FormHelperText>
                            <span className={styles.grey}>
                              {parseFloat(convert * details["price"]).toFixed(
                                2
                              )}
                            </span>
                          </FormHelperText>
                        ) : null}
                      </form>
                      <br />
                      {isAuthenticated ? (
                        <Button
                          variant="contained"
                          href="#"
                          style={{
                            width: "100%",
                            backgroundColor: "#4acd8d",
                            minHeight: "50px",
                          }}
                          onClick={() => handlePayment()}
                        >
                          Contribute Now
                        </Button>
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent className={styles.cardContent}>
                    <Button
                      variant="contained"
                      style={{
                        width: "100%",
                        backgroundColor: "#6f49fd",
                        minHeight: "50px",
                      }}
                      onClick={() => {
                        Router.push("./requests/" + id);
                      }}
                    >
                      View Withdrawal Request
                    </Button>

                    <Typography
                      variant="subtitle"
                      component="div"
                      style={{ marginTop: "2rem" }}
                    >
                      Check where the funds are being used and the requests
                      made.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </Box>
    </div>
  ) : (
    ""
  );
}

const INRPrice = async () => {
  try {
    const response = await fetch(
      "https://api.coinstats.app/public/v1/tickers?exchange=WazirX&pair=ETH-INR"
    );
    const value = await response.json();
    return value["tickers"][0]["price"];
  } catch (e) {
    console.log(e);
  }
};
