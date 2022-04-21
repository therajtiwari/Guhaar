
import "../../styles/Create.module.css";
import { useState, useEffect } from 'react';
import { Typography, Container, FormControl, Card, Grid, CardContent, TextField, Button, Box, Select, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
// import { DateTimePicker, LocalizationProvider, AdapterDateFns, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from "@mui/icons-material";
import Axios from 'axios';
import Nav from "../../components/Nav.js";

import _intializeContract from "../../components/contractconnector";

// import { cloudinary } from "../api/utils/cloudinary";
// import cloudinary from 'cloudinary';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const category = [
  "Education",
  "Environment",
  "Health",
  "Human Rights",
  "Humanitarian",
  "International",
  "Justice",
  "Local",
  "Media",
  "Peace",
  "Refugees",
  "Relief",
  "Security",
];

const create = () => {

  const [title, setTitle] = useState();
  const [mcategory, setmcategory] = useState([]);
  const [description, setDescription] = useState();
  const [goal, setGoal] = useState(0);
  const [imgURL, setImgURL] = useState();
  const [min, setMin] = useState(0);
  const [endDate, setEndDate] = useState(new Date());

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setmcategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const uploadImage = async (files) => {
    console.log(files[0])
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'ds3bk4hk');
    Axios.post('https://api.cloudinary.com/v1_1/decbsxlyq/image/upload', formData).then(res => {
      console.log(res.data.secure_url)
      setImgURL(res.data.secure_url)
    }).catch(err => {
      console.log(err)
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imgURL === "" || imgURL === undefined || imgURL === null) {
      setImgURL("https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg")
    };
    console.log(title, mcategory, description, goal, imgURL, endDate);
    const contract = _intializeContract();
    contract.functions.createCampaign(title, mcategory, description, goal, imgURL, endDate).then(res => { // insert arguments according to contract
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  };

  return (
    <>
      <Nav />
      <div className="wrapper" style={{
        zIndex: "1",
        marginTop: "2vh",
        marginBottom: "10vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        padding: "10px",
        maxWidth: "900px",
        margin: "auto",
        width: "100%",
      }}>
        <div className="createCampaign">
          <Container maxWidth="sm" style={{
            zIndex: "1",
            marginTop: "10vh",
            marginBottom: "2vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            padding: "10px",
            // boxShadow: "0px 0px 10px #000000",
            maxWidth: "500px"
          }}>
            <div className="title-text" style={{ backgroundColor: "#F4F4F4", padding: "10px 40px", borderRadius: "10px" }}>
              <Typography variant="h4" gutterBottom style={{ textColor: "white", margin: "0px" }}>
                Start a Campaign🚀
              </Typography>
            </div>
          </Container>
          <Container maxWidth="sm"
            style={{
              zIndex: "1",
              marginTop: "2vh",
              marginBottom: "10vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // backgroundColor: "#181111",
              backgroundColor: "#ffffff",
              // borderRadius: "10px",
              padding: "10px",
              // boxShadow: "0px 0px 10px #000000",
              maxWidth: "1500px"
            }}
          >

            <Grid>
              <Card style={{ maxWidth: 2000, padding: "20px 5px", margin: "0 auto", boxShadow: "none" }}>
                <CardContent>

                  <form>
                    <Grid container spacing={5}>
                      <Grid xs={12} sm={6} item>
                        <TextField label="Campaign Title" placeholder="Write a Title" variant="outlined" fullWidth required
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Grid>
                      <Grid xs={12} sm={6} item>
                        {/*formcontrol maxwidth */}
                        <FormControl variant="outlined" fullWidth required>
                          <InputLabel id="Select Category">Category</InputLabel>
                          <Select
                            labelId="Select Category"
                            id="category"
                            multiple
                            value={mcategory}
                            onChange={handleCategoryChange}
                            input={<OutlinedInput label="Category" />}
                            MenuProps={MenuProps}
                          >
                            {category.map((category) => (
                              <MenuItem
                                key={category}
                                value={category}
                              // style={getStyles(category, mcategory, theme)}
                              >
                                {category}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <br />
                      <Grid item xs={12}>
                        <TextField type="text" label="Description" placeholder="Write a Short Description" variant="outlined" multiline={true} rows={6} fullWidth required style={{ innerHeight: 200 }}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Grid>
                      <br />

                      <Grid xs={12} sm={6} item>
                        <TextField label="Target" variant="outlined" fullWidth required
                          InputProps={{
                            startAdornment: <InputAdornment position="start">⧫</InputAdornment>,
                          }}
                          type="number"
                          validators={['required', 'isNumber']}
                          errorMessages={['this field is required', 'please enter a valid number']}
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                        />
                      </Grid>

                      <Grid xs={12} sm={6} item>
                        <TextField label="Minimum Amount" variant="outlined" fullWidth required
                          InputProps={{
                            startAdornment: <InputAdornment position="start">⧫</InputAdornment>,
                          }}
                          type="number"
                          validators={['required', 'isNumber']}
                          errorMessages={['this field is required', 'please enter a valid number']}
                          value={min}
                          onChange={(e) => setMin(e.target.value)}
                        />
                      </Grid>

                      <Grid xs={12} sm={6} item>
                        <TextField label="Image" placeholder="Enter a URL or Upload an Image" variant="outlined" value={imgURL} fullWidth
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">
                                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file"
                                  onChange={(e) => uploadImage(e.target.files)} />
                                <label htmlFor="raised-button-file">
                                  <IconButton aria-label="upload picture" component="span">
                                    < PhotoCamera />
                                  </IconButton>
                                </label>
                              </InputAdornment>,
                          }}
                        />
                      </Grid>

                      <Grid xs={12} sm={6} item>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                          <DatePicker
                            label="Select End Date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12} sm={4} />
                      <Grid item xs={12} sm={4} >
                        <Button type="submit" variant="contained" color="primary" multiline="true" rows={3} fullWidth
                          style={{
                            backgroundColor: "#1DC071",
                            height: "50px",
                            marginTop: "10px",
                            fontSize: "20px",
                          }}
                          onClick={(event) => { handleSubmit(event) }}
                        >Submit</Button>
                      </Grid>
                      <Grid item xs={12} sm={4} />
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </div>
      </div >
    </>

  );
}

export default create;