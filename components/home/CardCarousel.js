import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";
import HomeCard from "./HomeCard";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1500, min: 1200 },
    items: 3,
  },
  tablet2: {
    breakpoint: { max: 1200, min: 600 },
    items: 2,
    partialVisibilityGutter: 200,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    partialVisibilityGutter: 100,
  },
};
export default function CardCarousel({ campaigns }) {
  // console.log(campaigns)

  const campaign = [];

  for (let i = 0; i < campaigns.length; i++) {
    const lastDay = new Date(campaigns[i][7] * 1000);
    const daysLeft = moment(lastDay).diff(moment(), "days");
    if (daysLeft > 0) {
      campaign.push(<HomeCard key={campaigns[i][0]} campaign={campaigns[i]} />);
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
        autoPlay={false}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5s"
        // transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        itemClass="carousel-item-padding-4-px"

      // deviceType={this.props.deviceType}
      >
        {/* <HomeCard imgURL={"https://preview.redd.it/kn1sczuqbp961.png?width=640&crop=smart&auto=webp&s=37ecfcefc65d92383e181d0883aaea5699bb13b0"} />
                <HomeCard imgURL={"https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/08.jpg"} />
                <HomeCard imgURL={"https://www.pixel4k.com/wp-content/uploads/2018/10/material-minimalist-4k_1539371343.jpg"} />
                <HomeCard imgURL={"https://icps.co.za/wp-content/uploads/2021/06/856a06c56821421f68666007f173e9c9.png"} />
                <HomeCard imgURL={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOVODHDZPtlq85sXYIZQ6IOidknVpIpVHijw&usqp=CAU"} /> */}

        {campaign}
      </Carousel>
    </div>
  );
}
