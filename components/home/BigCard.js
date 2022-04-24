import styles from "../../styles/Home.module.css";
import Grid from '@mui/material/Grid';


export default function BigCard({ campaign }) {
    const { title, description, imgURL, target, category, creator, id, lastDay, approveCount } = campaign;
    const imgAdd = "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/p-466-pa-0661.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=0f55ed0d0312dfcd3339c1d675e71946";
    return (
        <Grid style={{ padding: "0rem 3rem" }} container className={styles.BigCardWrapper}>
            <Grid item md={6} sm={10} className={styles.imageWrapper}>
                <img src={imgAdd} alt="" />
            </Grid>
            <Grid item md={6} sm={10} className={styles.infoWrapper} >
                <h3 style={{ color: '#606060', marginBottom: "10px" }}>{"Environment"}</h3>
                <h2 style={{ padding: "13px auto", fontSize: "1.5rem" }}>{"Save the Plants"}</h2>
                <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."}</p>

                <div className={styles.addInfo}>
                    <div className="raised" style={{ marginRight: "auto" }}>
                        <h2 style={{ padding: "12px auto" }}>₹ {"123232"}</h2>
                        <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>To be Raised ⧫{"234234234"}</p>
                    </div>
                    <div className="daysLeft" style={{ marginRight: "auto" }}>
                        <h2 style={{ padding: "12px auto" }}>{"29"}</h2>
                        <p style={{ padding: "12px auto", color: '#606060', fontSize: "1.1rem" }}>days left</p>
                    </div>
                </div>
                <div className="campaigner">
                    <p style={{ fontSize: "18px" }}>By <b>{"Raj Tiwari"}</b></p>
                </div>
            </Grid>
        </Grid>
    )

}


