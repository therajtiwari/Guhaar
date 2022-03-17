import React from 'react';
import SliderCard from './SliderCard';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
export default function Slider() {
    var items = [
        <SliderCard imgURL="https://wallpapersmug.com/large/4b3330/portrait-minimal-white-tiger-dark.jpg" />,
        <SliderCard imgURL="https://images.unsplash.com/photo-1521489871110-81dc5a61dbda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWluaW1hbCUyMGRhcmt8ZW58MHx8MHx8&w=1000&q=80" />,
        <SliderCard imgURL="https://preview.redd.it/0axcddoqbp961.png?width=640&crop=smart&auto=webp&s=2be177c72d8ec579ab12e48f4bed0755766008c3" />
    ]
    return (
        <div className="slider" >
            <Carousel
                indicators={true}
            >
                {items.map((item, i) => item)}
            </Carousel>



        </div >
    )

}
function Item(props) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}