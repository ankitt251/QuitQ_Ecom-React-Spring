import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";

const steps = ["Tax Details & Mobile", "Pickup Address", "Supplier Details"];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (value) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) &&
      setActiveStep(activeStep + value);

    activeStep == steps.length - 1 && handleCreateAccount();
    console.log("Active Step", activeStep);
  };

  const handleCreateAccount = () => {
    console.log("Create Account");
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
        address: "",
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
      password: "",
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
          {activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> : ""}
          {activeStep == 1 ? <BecomeSellerFormStep2 formik={formik} /> : ""}
          {activeStep == 2 ? <BecomeSellerFormStep3 formik={formik} /> : ""}
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
    </div>
  );
};

export default SellerAccountForm;
