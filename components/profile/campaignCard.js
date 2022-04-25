import { useState, useEffect } from 'react';
import { Typography, Container, Card, CardMedia, Grid, CardContent, TextField, Box, LinearProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ethers, Contract } from 'ethers';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FCFCFD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: "None",
  }));



const CampaignCard = ({ campaign }) => {
    // const name = "Covid Relief";
    // const category = "Education, Health, and Wellness";
    // const description = "Campaign Description";
    // const raised = 2;
    // const goal = 10;
    // const image = "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
    // const backers = 201
    // const daysLeft = "2"

    const id = campaign['id']
    const raised = ethers.utils.formatEther(campaign[0].toString())
    const backers = campaign[1].toString()
    const name = campaign[2];
    const description = campaign[3];
    const image = campaign[4];
    const goal = ethers.utils.formatEther(campaign[5].toString())
    const category = campaign[6];
    const lastDay = new Date(campaign[7] * 1000)
    const daysLeft = moment(lastDay).diff(moment(), 'days')

    // handling responsiveness
    const [direction, setDirection] = useState('none');
    const [border, setBorder] = useState('none');
    const [borderRadius, setBorderRadius] = useState('0px');

    const handleClick = () => {
        window.location.href = `/campaign/${id}`
    }

    const handleWindowResize = () => {
        if (window.innerWidth < 720) {
            setDirection('column');
            setBorder('1px solid #E0E0E0');
            setBorderRadius('20px');
        } else {
            setDirection('none');
            setBorder('none');
            setBorderRadius('0px');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return ( 
        <div className="Card" onClick={()=>handleClick()} style={{
            width: "100%",
            maxWidth: "800px",
            padding: "10px",
            // backgroundColor: "#1b1717",
            border : border,
            borderRadius: borderRadius,
        }}>
            
            <Card sx={{ display: 'flex', flexDirection: direction }} fullWidth style={{
                // borderRadius: "25px",
                border: "none",
                elevation: "0",
                boxShadow: "none",
                backgroundColor: "#FCFCFD",
            }}>
                <CardMedia
                        component="img"
                        sx={{ maxWidth: 350 }}
                        image={image}
                        style={{
                            borderRadius: "25px",
                        }}
                    />
                <Box sx={{ display: 'flex', flexDirection: 'column',  maxWidth: 450 , width: "100%"}} fullWidth>
                    <CardContent sx={{ flex: '1 0 auto',  }} fullWidth>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {category}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary" component="p">
                            {description}
                        </Typography>
                        <br />
                        <LinearProgress variant="determinate" value={raised*100/goal} />
                        <Grid container spacing={8} style={{
                            alignContent: "space-between",
                        }}>
                            {/* <Grid xs={12} sm={1} item /> */}
                            <Grid xs={12} sm={4} item spacing={{xs: 2,sm: 2}}>
                                <Item variant='outlined'>
                                    <Typography variant="h6" component="div">
                                        ⧫{raised} 
                                    </Typography>
                                </Item>
                                <Item variant='outlined'>
                                    <Typography variant="body2" component="div">
                                        raised of ⧫{goal}
                                    </Typography>
                                </Item>
                            </Grid>
                            {/* <Grid xs={12} sm={1} item /> */}
                            <Grid xs={12} sm={4} item spacing={{xs: 2,sm: 2}}>
                                <Item variant='outlined'>
                                    <Typography variant="h6" component="div">
                                        {backers}
                                    </Typography>
                                </Item>
                                <Item variant='outlined'>
                                    <Typography variant="body2" component="div">
                                        Backers
                                    </Typography>
                                </Item>
                            </Grid>
                            {/* <Grid xs={12} sm={1} item /> */}
                            <Grid xs={12} sm={4} item spacing={{xs: 2,sm: 2}}>
                                <Item variant='outlined'>
                                    <Typography variant="h6" component="div">
                                        {daysLeft}
                                    </Typography>
                                </Item>
                                <Item variant='outlined'>
                                    <Typography variant="body2" component="div">
                                        Days Left
                                    </Typography>
                                </Item>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
            </Card>
        </div>
     );
}
 
export default CampaignCard;