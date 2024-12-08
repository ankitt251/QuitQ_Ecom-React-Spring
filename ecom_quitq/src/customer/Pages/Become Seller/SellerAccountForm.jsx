import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import axios from "axios"; // Import axios for API calls

const steps = ["Tax Details & Mobile", "Pickup Address", "Supplier Details"];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleStep = (value) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) &&
      setActiveStep(activeStep + value);

    activeStep === steps.length - 1 && handleCreateAccount();
    console.log("Active Step", activeStep);
  };

  const handleCreateAccount = async () => {
    try {
      // Prepare the seller data
      const sellerData = {
        mobile: formik.values.mobile,
        password: formik.values.password,
        gstin: formik.values.gstin,
        pickupAddress: formik.values.pickupAddress,
        sellerName: formik.values.sellerName,
        email: formik.values.email,
        businessDetails: formik.values.businessDetails,
      };

      // Send a POST request to create the seller account
      const response = await axios.post(
        "http://localhost:8090/sellers/signup",
        sellerData
      );

      setSnackbarSeverity("success");
      setSnackbarMessage("Seller account created successfully!");
      setSnackbarOpen(true);
      console.log("Seller created successfully:", response.data);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error creating seller account. Please try again.");
      setSnackbarOpen(true);
      console.error("Error creating seller account:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        streetAddress: "",
        locality: "",
        city: "",
        state: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
    },

    onSubmit: (values) => {
      console.log(values, "formik submitted");
      console.log("active step", activeStep);
    },
  });

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section>
        <div>
          {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> : ""}
          {activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> : ""}
          {activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> : ""}
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            onClick={() => handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>

          <Button onClick={() => handleStep(1)} variant="contained">
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>

      {/* Snackbar for success/failure messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SellerAccountForm;
