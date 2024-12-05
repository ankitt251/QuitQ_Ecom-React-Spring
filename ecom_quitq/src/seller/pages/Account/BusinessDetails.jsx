import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const BusinessDetails = () => {
  const formik = useFormik({
    initialValues: {
      businessName: "",
      GSTIN: "",
      accountStatus: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        name="businessName"
        label="Business Name"
        value={formik.values.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessName && Boolean(formik.errors.businessName)
        }
        helperText={formik.touched.businessName && formik.errors.businessName}
        margin="normal"
      />
      <TextField
        fullWidth
        name="GSTIN"
        label="GSTIN"
        value={formik.values.GSTIN}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
        helperText={formik.touched.GSTIN && formik.errors.GSTIN}
        margin="normal"
      />
      <TextField
        fullWidth
        name="accountStatus"
        label="Account Status"
        value={formik.values.accountStatus}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
        }
        helperText={formik.touched.accountStatus && formik.errors.accountStatus}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default BusinessDetails;
