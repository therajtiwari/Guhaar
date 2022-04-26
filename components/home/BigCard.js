import styles from "../../styles/Home.module.css";
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { ethers, Contract } from 'ethers';


export default function BigCard({ campaign }) {
    // console.log(campaign);
    // const { title, description, imgURL, target, category, creator, id, lastDay, approveCount } = campaign;
    const lastDay = new Date(campaign[7] * 1000);
    const daysLeft = moment(lastDay).diff(moment(), 'days');
    const imgAdd = campaign[4];
    const creator="Huzaifa,  Raj, Ram, Shreyans"
    const handleClick = () => {
        window.location.href = `/campaign/${campaign["id"]}`
    }
    return (
        <div style={{ margin: "0px 2rem " }}>
            <Grid container className={styles.BigCardWrapper}>
                <Grid item md={6} sm={10} className={styles.imageWrapper}>
                    <img src={imgAdd} alt="" onClick={handleClick}/>
                </Grid>
                <Grid item md={6} sm={10} className={styles.infoWrapper} >
                    <h3 style={{ color: '#606060', marginBottom: "10px" }}>{campaign[6]}</h3>
                    <h2 style={{ padding: "13px auto", fontSize: "1.5rem" }}>{campaign[2]}</h2>
                    <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>
                        {/* {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."} */}
                        {campaign[3]}
                        </p>

                    <div className={styles.addInfo}>
                        <div className="raised" style={{ marginRight: "auto" }}>
                            <h2 style={{ padding: "12px auto" }}>₹ {parseFloat(campaign["price"]*ethers.utils.formatEther(campaign[5])).toFixed(2)}</h2>
                            <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>To be Raised ⧫{ethers.utils.formatEther(campaign[5])}</p>
                        </div>
                        <div className="daysLeft" style={{ marginRight: "auto" }}>
                            <h2 style={{ padding: "12px auto" }}>{daysLeft}</h2>
                            <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>days left</p>
                        </div>
                    </div>
                    <div className="campaigner">
                        <p style={{ fontSize: "18px" }}>By <b>{creator}</b></p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )

}


