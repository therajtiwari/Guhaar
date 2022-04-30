// import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'
import Layout from '../components/Layout';
import { MoralisProvider } from "react-moralis";
// import { useEffect } from 'react';
import Head from 'next/head'
import Router from "next/router"
import Loader from '../components/Loader';
import NProgress from "nprogress"

function MyApp({ Component, pageProps }) {
  Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
    console.log("router is changing", url);
  })
  // const {Moralis} = useMoralis()
  // useEffect(
  //    async ()=>{
  //      await Moralis.enableWeb3()
  //    }
  // )
  Router.events.on('routeChangeComplete', (url) => {
    NProgress.done();
    console.log("router change has ended", url);
  })
  return (
    <MoralisProvider serverUrl={process.env.MORALIS_SERVER_URL} appId={process.env.MORALIS_APPLICATION_ID}>
      <Head>
        <title>Guhaar</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Layout>

        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>

    // <MoralisProvider serverUrl="" appId="">
    //
    // </MoralisProvider>

  )
};

export default MyApp;