// import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // <MoralisProvider serverUrl="" appId="">
    //   
    // </MoralisProvider>
  );
}

export default MyApp
