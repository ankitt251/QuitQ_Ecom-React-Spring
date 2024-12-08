import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useAppDispatch } from "../../../State/Store";
import { signin } from "../../../State/customer/AuthSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State for Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'info', or 'warning'
  });

  // Snackbar handlers
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(signin(values));
      if (signin.fulfilled.match(resultAction)) {
        // Successful login
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        // Decode the JWT token to get the role (authorities)
        const token = resultAction.payload.jwt; // Assuming the token is in the payload
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Log the decoded token to see the structure and ensure 'authorities' is there
        const userRole = decodedToken.authorities.includes("ROLE_CUSTOMER")
          ? "ROLE_CUSTOMER"
          : "ROLE_ADMIN";

        console.log(userRole);
        if (userRole === "ROLE_CUSTOMER") {
          navigate("/account");
        } else if (userRole === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        // Handle login failure
        const errorResponse = resultAction.payload;
        const errorMessage =
          errorResponse?.message || "Login failed. Please try again.";
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-custom pb-8">Login</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ py: "11px", marginTop: "25px" }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
