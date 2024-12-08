import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useEffect } from "react";
import { fetchTransactionBySeller } from "../../../State/seller/transactionSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Transaction() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchTransactionBySeller(jwt));
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Customer Details</StyledTableCell>
            <StyledTableCell align="right">Order</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.transactions &&
            transactions.transactions.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.date || "N/A"} {/* Handle missing 'date' */}
                </StyledTableCell>
                <StyledTableCell align="right" component="th" scope="row">
                  {item.user?.email || "N/A"}{" "}
                  {/* Use optional chaining for 'customer' */}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.order?.id || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.order?.totalSellingPrice || "N/A"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
