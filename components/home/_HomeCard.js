import react from 'react';
import styles from "../../styles/Home.module.css";



export default function HomeCard({ imgURL }) {

    return (
        <div className={styles.homeCard}>
            <div className={styles.homeCardImage} >
                <img src={imgURL} alt="" />
            </div>
            <div className={styles.homeCardInfo}>
                <div className={styles.infoContainer}>
                    <h4>Architecture</h4>
                    <h3>Donate and help the poor</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure eveniet dolores mollitia voluptatem quasi</p>

                    <div className={styles.addInfo}>
                        <div className="raised">
                            <h3>Rs 10000</h3>
                            <p>Raised of 100000</p>
                        </div>
                        <div className="daysLeft">
                            <h3>25</h3>
                            <p>days left</p>
                        </div>
                    </div>
                    <div className="campaigner">
                        <p>By Raj</p>
                    </div>
                </div>
            </div>

        </div >
    )
}