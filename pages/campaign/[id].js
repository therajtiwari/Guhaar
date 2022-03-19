// import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function Home(props) {
  //   const { isAuthenticated } = useMoralis();
  const [convert, setConvert] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Stack>
              <Typography variant="h3" gutterBottom component="div">
                Covid Relief Fund
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                This Campaign is to Donate Funds for Covid Relief in India, the
                situation. The manager is https://twitter.com/harshbadhai28 and
                all the receives will go to ABCD Foundation which will help in
                buying, delivering oxygen, and other covid related help. If you
                want to withdraw funds from this campaign please feel free to
                create a request, and ping me on Twitter so that I can help you
                get the funds as soon as possible.
              </Typography>
            </Stack>
            <Grid
              container
              wrap="nowrap"
              direction="column"
              alignItems="stretch"
              gap={2}
            >
              <Grid item>
                <Card style={{ border: "1px solid" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Minimum Contribution
                    </Typography>
                    <Typography variant="h5" component="div">
                      0.001 ETH ($2.82)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Card style={{ border: "1px solid" }}>
                  <CardContent>
                    <Typography variant="h5" component="div" noWrap>
                      Wallet Address of Campaign Creator
                    </Typography>
                    <Typography variant="h5" component="div" noWrap>
                      0x5d7676dB6119Ed1F6C696419058310D16a734d
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ border: "1px solid" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Number of Requests
                    </Typography>
                    <Typography variant="h5" component="div">
                      5
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ border: "1px solid" }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Number of Approvers
                    </Typography>
                    <Typography variant="h5" component="div">
                      20
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* </Stack> */}
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" alignItems="stretch" gap={4}>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Campaign Balance
                    </Typography>
                    <Typography variant="h5" component="div">
                      12.75 ETH($35751.51)
                    </Typography>
                    <Typography variant="h5" component="div">
                      target of 11999 ETH ($33645675.96)
                    </Typography>
                    <LinearProgress variant="determinate" value={convert}></LinearProgress>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Contribute Now!
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                      <form>
                        <FormControl id="value" style={{ width: "100%" }}>
                          <FormLabel>
                            Amount in Ether you want to contribute
                          </FormLabel>
                          <Input
                            type="number"
                            step="any"
                            min="0"
                            onChange={(e) => {
                              setConvert(Math.abs(e.target.value));
                            }}
                          />
                          {convert ? (
                            <FormHelperText>{convert}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </form>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Button
                      variant="contained"
                      href="#"
                      style={{ width: "100%" }}
                    >
                      View Withdrawal Request
                    </Button>
                    <Typography variant="h5" component="div">
                      * You can see where these funds are being used & if you
                      have contributed you can also approve those Withdrawal
                      Requests :)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
