// import styles from "../styles/Home.module.css";
import PrimarySearchAppBar from "../components/home/Appbar"
import Slider from "../components/home/Slider"
import HomeCard from "../components/home/HomeCard"
import CardCarousel from "../components/home/CardCarousel";

import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";



export default function Home() {
  const { isAuthenticated } = useMoralis();



  return (
    <div>
      
      <PrimarySearchAppBar isAuthenticated ={isAuthenticated}/>
      <h2>Popular Campaigns</h2>
      <Slider />
      <div style={{ margin: "100px" }}></div>

      <h2>Recent Campaigns</h2>
      <CardCarousel />

      <div style={{ margin: "200px" }}></div>

      <h2>Other Campaigns</h2>
      <CardCarousel />

      <div style={{ margin: "100px" }}></div>


    </div >
  );
}