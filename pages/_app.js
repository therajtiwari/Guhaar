import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl="https://bcnjkfejk6z9.usemoralis.com:2053/server" appId="qqQAgg0YQYbJnLYDmvAQ4F5X7YBBZmQH8DhyCJH4">
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;