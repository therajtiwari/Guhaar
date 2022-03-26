
import "../../styles/Create.module.css";
import countries from "./countries";
import { useMoralis } from "react-moralis";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Typography, Container, FormControl, Card, Grid, CardContent, TextField, Button, Box , Select, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
// import { DateTimePicker, LocalizationProvider, AdapterDateFns, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

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

const country = countries

const create = () => {

  const [mcategory, setmcategory] = useState([]);
  const [mcountry, setmcountry] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
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

  const handleCountryChange = (event) => {
    setmcountry(event.target.value);
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  
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
          maxWidth: "500px"}}>
          <Typography variant="h3" gutterBottom style={{textColor: "white"}}> 
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
                  {/*formcontrol maxwidth */}
                  <FormControl variant="outlined" fullWidth>
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
                  <TextField type="text" label="Short Description" placeholder="Write a Short Description" variant="outlined" multiline={true} rows={8} fullWidth required style={{innerHeight:200}}/>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField type="text" label="Story" placeholder="Write Your Story" variant="outlined" multiline={true} rows={12} fullWidth required/>
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
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="Select country">Country</InputLabel>
                    <Select
                      labelId="Select country"
                      id="country"
                      multiple
                      value={mcountry}
                      onChange={handleCountryChange}
                      input={<OutlinedInput label="country" />}
                      MenuProps={MenuProps}
                    >
                      {country.map((country) => (
                        <MenuItem
                          key={country}
                          value={country}
                          // style={getStyles(country, mcountry, theme)}
                        >
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DateTimePicker
                      label="Select Start Date and Time"
                      value={startDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DateTimePicker
                      label="Select End Date and Time"
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
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