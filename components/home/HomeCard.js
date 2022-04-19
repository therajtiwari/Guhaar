import react from 'react';
import styles from "../../styles/Home.module.css";
import { ethers, Contract } from 'ethers';
import moment from 'moment';
import Link from 'next/link';


export default function HomeCard({ campaign }) {
    console.log(campaign)
    const minimum = ethers.utils.formatEther(campaign[0].toString())
    const approveCount = campaign[1].toString()
    // console.log(campaign[1].toString())
    const title = campaign[2]
    const description = campaign[3]
    const imgURL = campaign[4]
    const target = ethers.utils.formatEther(campaign[5].toString())
    const category = campaign[6]
    const creator = "Creator"
    const id=campaign['id']
    const lastDay = new Date(campaign[7] * 1000)
    console.log(lastDay);
    // const daysLeft = moment(campaign[6]).diff(moment(), 'days')
    const daysLeft = moment(lastDay).diff(moment(), 'days')
    // const daysLeft = moment("2023-02-01").diff(moment(), 'days')

    return (
        <Link href={"/campaign/"+id}>
        <div className={styles.homeCard}>
            <div className={styles.homeCardImage} >
                <img src={imgURL} alt="" />
            </div>
            <div className={styles.homeCardInfo}>
                <div className={styles.infoContainer}>
                    <h4>{category}</h4>
                    <h3>{title}</h3>
                    <p>{description}</p>

                    <div className={styles.addInfo}>
                        <div className="raised">
                            <h3>👍 {approveCount}</h3>
                            <p>To be Raised ⧫{target}</p>
                        </div>
                        <div className="daysLeft">
                            <h3>{daysLeft}</h3>
                            <p>days left</p>
                        </div>
                    </div>
                    <div className="campaigner">
                        <p>By {creator}</p>
                    </div>
                </div>
            </div>

        </div >
        </Link>
    )
}