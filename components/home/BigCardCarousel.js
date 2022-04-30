import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";
import BigCard from "./BigCard";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1500, min: 1200 },
    items: 1,
  },
  tablet2: {
    breakpoint: { max: 1200, min: 600 },
    items: 1,
    partialVisibilityGutter: 200,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
};
export default function BigCardCarousel({ campaigns }) {
  // console.log(campaigns)

  const campaign = [];

  for (let i = 0; i < campaigns.length; i++) {
    const lastDay = new Date(campaigns[i][7] * 1000);
    const daysLeft = moment(lastDay).diff(moment(), "days");
    if (daysLeft > 0) {
      campaign.push(<BigCard key={campaigns[i][0]} campaign={campaigns[i]} />);
    }
  }

  return (
    <div>
      <Carousel
        responsive={responsive}
        // swipeable={false}
        // draggable={false}
        // showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5s"
        // transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "tablet2", "mobile", "desktop"]}
        itemClass="carousel-item-padding-4-px"
      >
        {campaign}
      </Carousel>
    </div>
  );
}
