import Image from "next/image";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";
// import Logo from "./images/Web3Auth.svg";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function SignIn() {
  const { authenticate, authError, isAuthenticating, Moralis } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: process.env.CLIENT_ID,
      chainId: Moralis.Chains.ETH_RINKBEY,
    });
  };

  return (
    // <div className={styles.card}>
    //   {/* <Image className={styles.img} src={Logo} width={80} height={80} /> */}
    //   {isAuthenticating && <p className={styles.green}>Authenticating</p>}
    //   {authError && (
    //     <p className={styles.error}>{JSON.stringify(authError.message)}</p>
    //   )}
    //   <div className={styles.buttonCard}>
    <Button style={{ backgroundColor: "#6f49fd " }} variant="contained" onClick={handleCustomLogin}>
      Login with Web3Auth
    </Button>
    // </div>
    // </div>
  );
}
