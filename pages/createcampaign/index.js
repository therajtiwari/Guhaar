
import "../../styles/Create.module.css";
import { useMoralis } from "react-moralis";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Typography, Container, FormControl, Card, Grid, CardContent, TextField, Button, Box } from '@mui/material';


const create = () => {
  return (
    <div className="createCampaign">
      <Container maxWidth="sm" style={{
        marginTop: "10vh",
        marginBottom: "2vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0px 0px 10px #000000",
        maxWidth: "500px"
      }}>
        <Typography variant="h3" gutterBottom style={{ textColor: "white" }}>
          Start a Campaign🚀
        </Typography>
      </Container>
      <Container maxWidth="sm"
        style={{
          marginTop: "2vh",
          marginBottom: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#181111",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 0px 10px #000000",
          maxWidth: "1500px"
        }}
      >


        <Grid>
          <Card style={{ maxWidth: 2000, padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>

              <form>
                <Grid container spacing={5}>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Campaign Title" placeholder="Write a Title" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Select a Category" placeholder="Select a Category" variant="outlined" fullWidth required />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <TextField type="text" label="Short Description" placeholder="Write a Short Description" variant="outlined" multiline={true} rows={8} fullWidth required style={{ innerHeight: 200 }} />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <TextField type="text" label="Story" placeholder="Write Your Story" variant="outlined" multiline={true} rows={12} fullWidth required />
                  </Grid>
                  <br />

                  {/* add a giant box here */}
                  <Grid xs={12} sm={6} item>
                    <TextField label="Goal" placeholder="$0.00 USD" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Raised Amount" placeholder="$0.00 USD" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Amount Prefilled" placeholder="It will help fill amount box by click,place each amount by comma, eg: 10,20,30,40" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Video" placeholder="Place a link to your Campaign's Youtube Channel" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Campaign End Method" placeholder="Select One" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Country" placeholder="Select a Country" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="Start Date" placeholder="Start Date" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField label="End Date" placeholder="End Date" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12} sm={4} />
                  <Grid item xs={12} sm={4} >
                    <Button type="submit" variant="contained" color="primary" multiline="true" rows={3} fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default create;
// /newcampai