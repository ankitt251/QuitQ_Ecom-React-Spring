import { Box, Button, Grid2, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must be a valid 10-digit number starting with 6-9"
    ),

  pincode: Yup.string()
    .required("Pin code is required")
    .matches(/^[1-9]{1}[0-9]{5}$/, "Pin code must be a valid 6-digit number"),

  streetAddress: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  city: Yup.string()
    .required("City is required")
    .min(3, "City must be at least 3 characters")
    .max(50, "City cannot exceed 50 characters"),

  state: Yup.string()
    .required("State is required")
    .min(3, "State must be at least 3 characters")
    .max(50, "State cannot exceed 50 characters"),

  locality: Yup.string()
    .required("Locality is required")
    .min(3, "Locality must be at least 3 characters")
    .max(50, "Locality cannot exceed 50 characters"),
});

const AddressForm = ({ paymentGateway }) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pincode: "",
      streetAddress: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt);

      console.log(values);
      dispatch(createOrder({ shippingAddress: values, jwt, paymentGateway }));
    },
  });

  return (
    <div>
      <Box sx={{ max: "auto" }}>
        <p className="text-xl font-bold text-center pb-5">Contact Details</p>
        <form onSubmit={formik.handleSubmit} action="">
          <Grid2 container spacing={2.5}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="pincode"
                label="Pin Code"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="streetAddress"
                label="address"
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.touched.streetAddress && formik.errors.streetAddress
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="locality"
                label="locality"
                value={formik.values.locality}
                onChange={formik.handleChange}
                error={
                  formik.touched.locality && Boolean(formik.errors.locality)
                }
                helperText={formik.touched.locality && formik.errors.locality}
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ py: "10px" }}
              >
                Add Address
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </div>
  );
};

export default AddressForm;
