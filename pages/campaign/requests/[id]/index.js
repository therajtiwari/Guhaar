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

const Requests = () => {
  return (
    <>
      <Nav />
      <div className={styles.titleArea}>
        <h2 style={{ marginBottom: "5px" }}>Withdrawal Requests</h2>
        <Button
          className={styles.withdrawRequestButton}
          variant="contained"
          disableElevation="true"
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
