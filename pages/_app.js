// import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'
import Layout from '../components/Layout';
import { MoralisProvider } from "react-moralis";


function MyApp({ Component, pageProps }) {

  return (
    <MoralisProvider serverUrl="https://bcnjkfejk6z9.usemoralis.com:2053/server" appId="qqQAgg0YQYbJnLYDmvAQ4F5X7YBBZmQH8DhyCJH4">

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