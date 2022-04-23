import { useState, useEffect } from 'react';
import { Typography, Container, Card, CardMedia, Grid, CardContent, TextField, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: "None",
  }));

const CampaignCard = () => {
    const name = "Covid Relief";
    const category = "Education, Health, and Wellness";
    const description = "Campaign Description";
    const raised = "2";
    const goal = "10";
    const image = "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"

    return ( 
        <div className="Card" style={{
            width: "100%",
            maxWidth: "800px",
            padding: "10px",
        }}>
            
            <Card sx={{ display: 'flex' }} >
                <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image={image}
                    />
                <Box sx={{ display: 'flex', flexDirection: 'column' }} fullWidth>
                    <CardContent sx={{ flex: '1 0 auto' }} fullWidth>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {category}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                            {description}
                        </Typography>
                        <Grid>
                            <Item variant='outlined'>
                                <Typography variant="h6" component="div">
                                    ⧫{raised} 
                                </Typography>
                            </Item>
                            <Item variant='outlined'>
                                <Typography variant="body2" component="div">
                                raised of ⧫{goal} goal
                                </Typography>
                            </Item>
                        </Grid>
                    </CardContent>
                </Box>
            </Card>
        </div>
     );
}
 
export default CampaignCard;