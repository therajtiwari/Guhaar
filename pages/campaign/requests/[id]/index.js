import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styles from "../../../../styles/Withdrawal.module.css";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import Nav from "../../../../components/Nav";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import getCampaignRequest from "../../../../components/getCampaignRequests.server";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CampaignArtifact from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { ethers } from "ethers";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";

import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  outline: "none",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6f49fd",
    color: theme.palette.common.white,
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fcfcfd",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  id,
  description,
  amount,
  approved,
  totalApprovers,
  isApproved,
  isFinalizedByAll
) {
  const approveRatio = "1/10";
  // approved
  //   .toString()
  //   .concat("/", totalApprovers.toString());
  return {
    id,
    description,
    amount,
    approveRatio,
    isApproved,
    isFinalizedByAll,
  };
}

// createData(
//   0,
//   "Request 1",
//   1,
//   "0x1234567890123456789012345678901234567890",
//   1,
//   20,
//   "Approve",
//   "Finalize",
//   true,
//   true
// ),
//   createData(
//     1,
//     "Request 2",
//     2,
//     "0x1234567890123456789012345678901234567890",
//     11,
//     20,
//     "Approve",
//     "Finalize",
//     true,
//     true
//   ),
//   createData(
//     2,
//     "Request 3",
//     3,
//     "0x1234567890123456789012345678901234567890",
//     15,
//     20,
//     "Approve",
//     "Finalize",
//     true,
//     true
//   ),
//   createData(
//     3,
//     "Request 4",
//     4,
//     "0x1234567890123456789012345678901234567890",
//     6,
//     20,
//     "Approve",
//     "Finalize",
//     false,
//     false
//   ),

const StyledButton = styled(Button)`
  &:hover {
    background-color: #4acd8d;
  }
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Requests = () => {
  const {
    user,
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
    isInitialized,
  } = useMoralis();
  let [loading, setLoading] = useState(true);
  const [userAddress, setUserAddress] = useState(null);

  const [rows, setRows] = useState([]);

  //MODAL

  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [alertServerity, setAlertServerity] = useState("success");
  const [canApprove, setCanApprove] = useState(false);
  let [color, setColor] = useState("#6f49fd");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setRequestAmount("");
    setRequestDescription("");
    setRequestTitle("");
    setOpen(false);
  };

  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();

  const router = useRouter();
  const { id } = router.query;

  const ApproveRequests = async (id) => {
    let success = false;
    await fetch({
      onComplete: (a) => {
        success = true;
      },
      onError: (a) => {
        success = false;
      },
      onSuccess: (a) => {
        success = true;
      },
      params: {
        contractAddress: id,
        functionName: "approveRequest",
        abi: CampaignArtifact.abi,
        params: {
          index: 0, // index fix
        },
      },
    })
      .then((res) => {
        success = true;
      })
      .catch((err) => {
        success = false;
      });

    return success;
  };

  const createRequest = async (id, des, amount) => {
    let success = false;
    await fetch({
      onComplete: () => {
        console.log("done");
        // success = true;
      },
      onError: (a) => {
        console.log("eorrorrrrrrr");
        success = false;
      },
      onSuccess: (a) => {
        console.log("ho gaya");
        console.log(JSON.stringify(a));
        success = true;
      },
      params: {
        contractAddress: id,
        functionName: "createRequest",
        abi: CampaignArtifact.abi,
        params: {
          description: des, // add actual description
          value: ethers.utils.parseEther(amount.toString()),
        },
      },
    })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("eroor");
        success = false;
      });

    return success;
  };

  const handleAddRequest = async () => {
    // handleOpen();
    if (
      requestDescription &&
      requestAmount > 0 &&
      requestAmount < 50
    ) {
      await Moralis.authenticate();
      if (isAuthenticated) {
        const res = await createRequest(id, requestDescription, requestAmount);
        if (res) {
          setAlertServerity("success");
        } else {
          setAlertServerity("error");
        }
      }
      else {
        setAlertServerity("error");
      }

    } else {
    }
    handleClose();
    setAlert(true);
    // setTimeout(async () => {
    //   setLoading(true);
    //   await getAllCampaignRequests();
    //   setLoading(false);
    // }, 5000);

    //  set timeout for 5sec
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const handleApproveRequest = async (id) => {
    if (isAuthenticated && isInitialized && isWeb3Enabled) {
      const res = await ApproveRequests(id);
      if (res) {
        setAlertServerity("success");
      } else {
        setAlertServerity("error");
      }
    } else {
      setAlertServerity("error");
    }
    handleClose();
    setAlert(true);
    //  set timeout for 5sec
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const getAllCampaignRequests = async () => {
    const { datalist, canapprove } = await getCampaignRequest(
      Moralis,
      id,
      userAddress || "0x0000000000000000000000000000000000000000",
      isWeb3Enabled,
      isAuthenticating,
      isWeb3EnableLoading
    );
    setCanApprove(canapprove);
    console.log("datalist is", datalist);
    console.log("canapprove", canapprove);
    const tempRows = [];
    if (datalist?.length > 0) {
      datalist.forEach((detail) => {
        const currData = createData(
          detail.index + 1,
          detail.description,
          detail.value / 10 ** 18,
          detail.approvalCount,
          10,
          true,
          detail.complete
        );
        tempRows.push(currData);
      });
      setRows(tempRows);
    }
  };

  useEffect(async () => {
    if (isAuthenticated) {
      setUserAddress(user.attributes.accounts[0]);
    }

    if (isInitialized && id) {
      await getAllCampaignRequests();
      setLoading(false);
    }
  }, [isInitialized, id]);

  return (
    <>
      <Nav />
      {loading ? (
        <div
          className="loader"
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BounceLoader
            color={color}
            loading={loading}
            css={override}
            size={120}
          />
        </div>
      ) : (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            outline="none"
          >
            <Box sx={style}>
              <div
                className="temp"
                style={{ display: "flex", alignItems: "center" }}
              >
                <AddCircleIcon
                  fontSize="large"
                  style={{ marginRight: "15px", color: "#6f49fd" }}
                />
                <h2>Create a New Request</h2>
              </div>
              <Divider />
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <h4>Description</h4>
                <Input
                  id="rquest-description"
                  value={requestDescription}
                  multiline
                  rows={3}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start"></InputAdornment>
                  }
                />
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <h4>Amount</h4>
                <Input
                  id="standard-adornment-amount"
                  value={requestAmount}
                  type="number"
                  onChange={(e) => setRequestAmount(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">Eth</InputAdornment>
                  }
                />
              </FormControl>
              <br />
              <br />

              <StyledButton
                onClick={handleAddRequest}
                variant="contained"
                className={styles.formSubmitButton}
              >
                Create
              </StyledButton>
            </Box>
          </Modal>
          <div className={styles.titleArea}>
            <h2 style={{ marginBottom: "5px" }}>Withdrawal Requests</h2>
            {isAuthenticated ?
              <Button
                className={styles.withdrawRequestButton}
                variant="contained"
                onClick={handleOpen}
              >
                <b>Add Request</b>
              </Button>
              :
              null}
          </div>
          <div className="table-wrapper">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow style={{ height: 80 }}>
                    <StyledTableCell align="right">
                      <b>ID</b>
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ maxWidth: "300px" }}
                      align="right"
                    >
                      <b>Description</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Amount&nbsp;(Eth)</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Approval Count</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Approve</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Finalize</b>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow
                      style={{
                        height: 70,
                        backgroundColor: row.isFinalizedByAll
                          ? "#f6f6f6"
                          : "#fff",
                      }}
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="right">{row.id}</StyledTableCell>
                      <StyledTableCell
                        style={{ maxWidth: "300px" }}
                        align="right"
                      >
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.amount}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.approveRatio}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.isApproved ? (
                          <DoneIcon className={styles.success} />
                        ) : (
                          <Button
                            variant="contained"
                            className={styles.approvalButton}
                          >
                            Approve
                          </Button>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        {row.isFinalized ? (
                          <DoneIcon className={styles.success} />
                        ) : (
                          // <Button
                          //   variant="contained"
                          //   className={styles.approvalButton}
                          // >
                          //   Finalize
                          // </Button>
                          <HourglassTopIcon className={styles.remaining} />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              className="alertBox"
              style={{
                position: "fixed",
                bottom: "40px",
                display: "flex",
                width: "90%",
                margin: "auto",
                justifyContent: "center",
                zIndex: "1000",
              }}
            >
              {alert ? (
                alertServerity === "success" ? (
                  <Alert
                    variant="filled"
                    severity="success"
                    style={{ backgroundColor: "#4acd8d !important" }}
                  >
                    Success
                  </Alert>
                ) : (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{ backgroundColor: "#eb5757 !important" }}
                  >
                    Something went wrong. Please try again.
                  </Alert>
                )
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Requests;
