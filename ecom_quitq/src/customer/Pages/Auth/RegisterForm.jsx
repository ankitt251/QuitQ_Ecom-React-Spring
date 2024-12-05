import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const RegisterForm = () => {
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
    onSubmit: (values) => {
      console.log("form data", values);
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
          name="fullname"
          label="Full Name"
          type="fullname"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ py: "11px", marginTop: "25px" }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registering in..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
