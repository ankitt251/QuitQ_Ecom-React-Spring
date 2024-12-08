import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../../../State/customer/AuthSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      fullName: Yup.string().required("Full Name is required"),
      username: Yup.string().required("Username is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(signup(values));
        if (signup.fulfilled.match(resultAction)) {
          setSnackbar({
            open: true,
            message: "Registration successful! Redirecting to login...",
            severity: "success",
          });
          setTimeout(() => {
            onRegisterSuccess(); // Switch to login form
          }, 2000);
        } else {
          setSnackbar({
            open: true,
            message: resultAction.payload || "Registration failed. Try again.",
            severity: "error",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "An unexpected error occurred.",
          severity: "error",
        });
      }
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-custom pb-8">
        Register
      </h1>
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
        <TextField
          fullWidth
          name="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          fullWidth
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          name="mobile"
          label="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ py: "11px", marginTop: "25px" }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterForm;
