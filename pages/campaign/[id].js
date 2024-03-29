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
import Nav from "../../components/Nav";
import fetch from "node-fetch";
import { InputAdornment } from "@mui/material";
import { Divider } from "@mui/material";
import Router from "next/router";
import Checkbox from "@mui/material/Checkbox";
import getCampaigndetails from "../../components/getCampaigndetails.server";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import swal from 'sweetalert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';


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
  const [wantToApprove, setwantToApprove] = useState(true);
  // const wantToApprove=true;
  // const [flag, setFlag] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const handleChange = (event) => {
    setwantToApprove(event.target.checked);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    // console.log(convert);
    if (parseFloat(convert * details["price"]).toFixed(2) < 100) {
      handleClickOpen();
    }
    else {
      await Moralis.authenticate();
      // if (!Moralis.isWeb3Enabled) {
      //   await Moralis.enableWeb3({
      //     provider: "web3Auth",
      //     clientId: process.env.CLIENT_ID,
      //     chainId: Moralis.Chains.ETH_RINKBEY
      //   })
      // }
      // console.log("isndiofn");
      fetch({
        onComplete: (a) => console.log(a),
        onError: (a) => console.error(a.toString()),
        onSuccess: (a) => swal({
          title: "You Have Successfully Contributed",
          text: "It may take some time to reflect into system. Check the campaign after some time into system",
          icon: "success",
          button: {
            text: "Ok",
          },
        }),
        params: {
          contractAddress: id,
          functionName: "contibute",
          abi: CampaignArtifact.abi,
          params: {
            wantToApprove: wantToApprove, // option checkbox to approve
          },
          msgValue: ethers.utils.parseEther(convert.toString()),
        },
      })
        .then((res) => console.log("done"))
        .catch((err) => console.log("error"));

    }
  };

  return details != null ? (

    <div>
      <Nav />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              minWidth: "400px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Invalid Amount"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          <Alert variant="filled" severity="error">
            Minimum Contribution is Rs 100.
          </Alert>
        </DialogContent>

      </Dialog>
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
                  Minimum Contribution (to become Approver)
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
                  <Typography style={{ cursor: "pointer" }} className={styles.infoText}>
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
                  {details[9]}
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
                          parseFloat(ethers.utils.formatEther(details[8]) *
                            details["price"]).toFixed(2) +
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
                              <div style={{ fontSize: "18px" }}>Rs {parseFloat(convert * details["price"]).toFixed(
                                2
                              )}</div>
                            </span>
                          </FormHelperText>
                        ) : null}
                      </form>
                      <br />
                      {isAuthenticated ? (
                        <div>
                          <FormControlLabel
                            label='Approve Manually'
                            control={
                              <Checkbox
                                checked={wantToApprove}
                                onChange={handleChange}
                              />
                            }
                          />
                          <Tooltip title="You Become an approver for each request of the campaign creator">
                            <IconButton
                              size="small"
                              color="inherit"
                            >
                              <QuestionMarkIcon style={{ height: '16px' }} />
                            </IconButton>
                          </Tooltip>
                        </div>
                      ) : null}
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
