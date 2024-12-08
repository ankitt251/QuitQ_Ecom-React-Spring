import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerOrder } from "../../../State/seller/sellerOrderSlice";
import { fetchTransactionBySeller } from "../../../State/seller/transactionSlice";
import { Paper, Typography, CircularProgress, Box } from "@mui/material";
import { ShoppingCartOutlined, PaymentOutlined } from "@mui/icons-material";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Get orders and transactions from the state
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.sellerOrders);
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useSelector((state) => state.transactions);

  // Fetch data when the component mounts
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchSellerOrder(jwt));
      dispatch(fetchTransactionBySeller(jwt));
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Welcome back, Seller!
      </Typography>

      {/* Number of Orders Block */}
      <Paper
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShoppingCartOutlined sx={{ fontSize: "40px", color: "#1976d2" }} />
          <Typography variant="h6">Number of Orders</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {ordersLoading ? (
            <CircularProgress size={24} sx={{ color: "#1976d2" }} />
          ) : ordersError ? (
            <Typography variant="body2" color="error">
              {`Error: ${ordersError}`}
            </Typography>
          ) : (
            <Typography variant="h5">{orders.length}</Typography>
          )}
        </Box>
      </Paper>

      {/* Total Transactions Block */}
      <Paper
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <PaymentOutlined sx={{ fontSize: "40px", color: "#4caf50" }} />
          <Typography variant="h6">Total Transactions</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {transactionsLoading ? (
            <CircularProgress size={24} sx={{ color: "#4caf50" }} />
          ) : transactionsError ? (
            <Typography variant="body2" color="error">
              {`Error: ${transactionsError}`}
            </Typography>
          ) : (
            <Typography variant="h5">{transactions.length}</Typography>
          )}
        </Box>
      </Paper>

      {/* Additional sections */}
      {/* Other blocks like recent activity, manage listings, etc. */}
    </Box>
  );
};

export default Dashboard;
