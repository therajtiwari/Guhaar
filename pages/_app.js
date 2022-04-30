// import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { MoralisProvider } from "react-moralis";
// import { useEffect } from 'react';
import Head from "next/head";
import Router from "next/router";
import Loader from "../components/Loader";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });
  // const {Moralis} = useMoralis()
  // useEffect(
  //    async ()=>{
  //      await Moralis.enableWeb3()
  //    }
  // )
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  });
  return (
    <MoralisProvider
      serverUrl={process.env.MORALIS_SERVER_URL}
      appId={process.env.MORALIS_APPLICATION_ID}
    >
      <Head>
        <title>Guhaar</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>

    // <MoralisProvider serverUrl="" appId="">
    //
    // </MoralisProvider>
  );
}

export default MyApp;
