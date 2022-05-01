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
import getCampaignRequest from "../../../../components/getCampaignRequests.server"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CampaignArtifact from "../../../../artifacts/contracts/Campaign.sol/Campaign.json";
import { ethers } from "ethers";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import Divider from "@mui/material/Divider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  minWidth: '350px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  outline: 'none',
}

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
  address,
  approved,
  totalApprovers,
  approve,
  finalize,
  isApproved,
  isFinalized
) {
  const approveRatio = approved
    .toString()
    .concat("/", totalApprovers.toString());
  return {
    id,
    description,
    amount,
    address,
    approveRatio,
    approve,
    finalize,
    isApproved,
    isFinalized,
  };
}



const rows = [
  createData(
    0,
    "Request 1",
    1,
    "0x1234567890123456789012345678901234567890",
    1,
    20,
    "Approve",
    "Finalize",
    true,
    true
  ),
  createData(
    1,
    "Request 2",
    2,
    "0x1234567890123456789012345678901234567890",
    11,
    20,
    "Approve",
    "Finalize",
    true,
    true
  ),
  createData(
    2,
    "Request 3",
    3,
    "0x1234567890123456789012345678901234567890",
    15,
    20,
    "Approve",
    "Finalize",
    true,
    true
  ),
  createData(
    3,
    "Request 4",
    4,
    "0x1234567890123456789012345678901234567890",
    6,
    20,
    "Approve",
    "Finalize",
    false,
    false
  ),
];


const StyledButton = styled(Button)`
    &:hover {
      background-color: #4acd8d;
    }
`;
const Requests = () => {
  const {
    user,
    Moralis,
    isWeb3Enabled,
    isAuthenticated,
    isAuthenticating,
    isWeb3EnableLoading,
    isInitialized
  } = useMoralis();
  const [userAddress, setUserAddress] = useState(null);



  //MODAL

  const [requestTitle, setRequestTitle] = useState(null);
  const [requestDescription, setRequestDescription] = useState(null);
  const [requestAmount, setRequestAmount] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setRequestAmount(null);
    setRequestDescription(null);
    setRequestTitle(null);
    setOpen(false);
  }


  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();

  const router = useRouter();
  const { id } = router.query;

  function ApproveRequests(id) {
    fetch({
      onComplete: (a) => console.log(a),
      onError: (a) => console.error(a.toString()),
      onSuccess: (a) => console.log(JSON.stringify(a)),
      params: {
        contractAddress: id,
        functionName: "approveRequest",
        abi: CampaignArtifact.abi,
        params: {
          index: 0, // index fix
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data, error);
  }

  function createRequest(id, des, amount) {
    // console.log("id now us", id);
    fetch({
      onComplete: (a) => console.log(a),
      onError: (a) => console.error(a.toString()),
      onSuccess: (a) => console.log(JSON.stringify(a)),
      params: {
        contractAddress: id,
        functionName: "createRequest",
        abi: CampaignArtifact.abi,
        params: {
          description: des, // add actual description
          value: ethers.utils.parseEther(amount.toString())
        },
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data, error);
  }


  const handleAddRequest = () => {
    handleOpen();
    const des = "oiasndfn";
    const amount = "0.0003";
    // createRequest(id, des, amount);
  }

  useEffect(async () => {

    if (isAuthenticated) {
      setUserAddress(user.attributes.accounts[0]);
      // console.log(user.attributes.accounts[0]);
    }

    if (isInitialized && id) {
      // console.log("id ", id);
      // const reqDetails = await getCampaignRequest(
      //   Moralis,
      //   id,
      //   userAddress,
      //   isWeb3Enabled,
      //   isAuthenticating,
      //   isWeb3EnableLoading,
      // );
      // console.log(reqDetails);


    }

  }, [isInitialized, id])

  return (
    <>
      <Nav />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        outline="none"
      >
        <Box sx={style}>
          <div className="temp" style={{ display: "flex", alignItems: "center" }}>
            <AddCircleIcon fontSize="large" style={{ marginRight: "15px", color: "#6f49fd" }} />
            <h2>Create a New Request</h2>
          </div>
          <Divider />

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <h4>Title</h4>
            <Input
              id="rquest-title"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
            />
          </FormControl>
          <br />
          <br />
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <h4>Description</h4>
            <Input
              id="rquest-description"
              value={requestDescription}
              multiline
              rows={3}
              onChange={(e) => setRequestDescription(e.target.value)}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
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
              startAdornment={<InputAdornment position="start">Eth</InputAdornment>}
            />
          </FormControl>
          <br />
          <br />
          <br />

          <StyledButton onClick={handleAddRequest} variant="contained" className={styles.formSubmitButton}>Create</StyledButton>
        </Box>
      </Modal>
      <div className={styles.titleArea}>
        <h2 style={{ marginBottom: "5px" }}>Withdrawal Requests</h2>
        <Button
          className={styles.withdrawRequestButton}
          variant="contained"
          // disableElevation=true
          // onClick={handleAddRequest}
          onClick={handleOpen}


        >
          <b>Add Request</b>
        </Button>
      </div>
      <div className="table-wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow style={{ height: 80 }}>
                <StyledTableCell align="right">
                  <b>ID</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Description</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Amount&nbsp;(Eth)</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Recipient Wallet Address</b>
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
                    backgroundColor: row.isFinalized ? "#f6f6f6" : "#fff",
                  }}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="right">{row.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
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
                      <Button
                        variant="contained"
                        className={styles.approvalButton}
                      >
                        Finalize
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Requests;
