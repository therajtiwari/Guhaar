import React from "react";
import styles from "../../styles/Slider.module.css";

function valuetext(value) {
  return `${value}°C`;
}
export default function SliderCard({
  title,
  description,
  percentCompleted,
  currentRaised,
  totalToRaise,
  backers,
  daysLeft,
  imgURL,
}) {
  return (
    <div className={styles.sliderCard}>
      <div className={styles.sliderImage}>
        <img src={imgURL} alt="" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.infoContainer}>
          <h4>Architecture</h4>
          <h3>Donate and help the poor</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo iure
            eveniet dolores mollitia voluptatem quasi
          </p>
          <div className="percentCompleted">
            {/* <Box sx={{ width: 300 }}>
                        <Slider
                            defaultValue={80}
                            getAriaValueText={valuetext}
                            disabled={true}
                        />
                    </Box> */}
            <h4>80% completed</h4>
          </div>

          <div className={styles.addInfo}>
            <div className="raised">
              <h3>Rs 10000</h3>
              <p>Raised of 100000</p>
            </div>
            <div className="numDonators">
              <h3>10 </h3>
              <p>total Backers</p>
            </div>
            <div className="daysLeft">
              <h3>25</h3>
              <p>days left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
