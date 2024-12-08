import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, styled, Modal, Box, TextField } from "@mui/material";

const accountStatuses = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "INACTIVE", title: "Inactive" },
  { status: "BANNED", title: "Banned" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "CLOSED", title: "Closed" },
];

// Define colors for each account status
const statusColors = {
  PENDING_VERIFICATION: "#FFB74D", // Orange
  ACTIVE: "#81C784", // Green
  INACTIVE: "#FFEB3B", // Yellow
  BANNED: "#E57373", // Red
  DEACTIVATED: "#7986CB", // Blue
  CLOSED: "#BDBDBD", // Grey
};

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const [open, setOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);

  // Fetch sellers data
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/admin/sellers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add JWT token for authentication
            },
          }
        );
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleStatusChange = async () => {
    if (selectedSeller && newStatus) {
      try {
        const response = await axios.patch(
          `http://localhost:8090/api/admin/seller/${selectedSeller.id}/${newStatus}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add JWT token for authentication
            },
          }
        );
        const updatedSeller = response.data;
        setSellers((prevSellers) =>
          prevSellers.map((seller) =>
            seller.id === updatedSeller.id ? updatedSeller : seller
          )
        );
        setStatusChangeOpen(false);
      } catch (error) {
        console.error("Error updating seller status:", error);
      }
    }
  };

  const handleOpenStatusModal = (seller) => {
    setSelectedSeller(seller);
    setNewStatus(seller.accountStatus);
    setStatusChangeOpen(true);
  };

  const handleCloseStatusModal = () => {
    setStatusChangeOpen(false);
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Account Status
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={accountStatus}
            label="Account Status"
            onChange={(event) => setAccountStatus(event.target.value)}
          >
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller) => (
              <StyledTableRow key={seller.id}>
                <StyledTableCell component="th" scope="row">
                  {seller.name}
                </StyledTableCell>
                <StyledTableCell align="right">{seller.email}</StyledTableCell>
                <StyledTableCell align="right">{seller.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {seller.businessDetails?.businessName}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{
                    backgroundColor: statusColors[seller.accountStatus],
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {seller.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleOpenStatusModal(seller)}>
                    Change
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Changing Seller Status */}
      <Modal
        open={statusChangeOpen}
        onClose={handleCloseStatusModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <h2 id="modal-title">Change Seller Status</h2>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">New Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {accountStatuses.map((status) => (
                <MenuItem key={status.status} value={status.status}>
                  {status.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStatusChange}
            sx={{ mt: 2 }}
          >
            Update Status
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: 24,
};

export default SellersTable;
