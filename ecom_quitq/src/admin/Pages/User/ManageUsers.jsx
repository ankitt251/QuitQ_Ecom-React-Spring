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
import { Button, styled, Modal, Box } from "@mui/material";

const accountStatuses = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "INACTIVE", title: "Inactive" },
  { status: "BANNED", title: "Banned" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "CLOSED", title: "Closed" },
];

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

const ManageUsers = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/admin/users", // Adjust the endpoint as necessary
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add JWT token for authentication
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async () => {
    if (selectedUser && newStatus) {
      try {
        const response = await axios.patch(
          `http://localhost:8090/api/admin/user/${selectedUser.id}/${newStatus}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Add JWT token for authentication
            },
          }
        );
        const updatedUser = response.data;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setStatusChangeOpen(false);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  const handleOpenStatusModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.accountStatus);
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
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.fullName}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.accountStatus}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleOpenStatusModal(user)}>
                    Change
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Changing User Status */}
      <Modal
        open={statusChangeOpen}
        onClose={handleCloseStatusModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="modal-title">Change User Status</h2>
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

export default ManageUsers;
