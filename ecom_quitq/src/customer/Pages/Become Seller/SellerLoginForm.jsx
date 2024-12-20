import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerLoginForm = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Formik setup with validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        console.log("Submitting data: ", values); // Debugging
        const response = await axios.post(
          "http://localhost:8090/sellers/loginSeller",
          values
        );
        console.log("Server response: ", response.data); // Debugging
        localStorage.setItem("jwt", response.data.jwt);
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/seller");
      } catch (error) {
        console.error("Error response: ", error.response); // Debugging
        setSnackbarMessage(error.response?.data?.message || "Login failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setFieldError("email", error.response?.data?.message || "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-custom pb-5">
        Login As Seller
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

      {/* Snackbar for success or failure */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
};

export default SellerLoginForm;
