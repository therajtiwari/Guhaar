// import { MoralisProvider } from "react-moralis";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<Component {...pageProps} />
    // <MoralisProvider serverUrl="" appId="">
    //   
    // </MoralisProvider>
  );
}

export default MyApp
