import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Setting up Axios Interceptors for JWT Token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const CreateCategory = () => {
  const [categories, setCategories] = useState([
    { name: "", parentCategory: null, categoryId: "", image: "" },
  ]);
  const [allCategories, setAllCategories] = useState([]);
  const [newParentCategory, setNewParentCategory] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetching all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/category"); // Axios adds JWT token
      setAllCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedCategories = [...categories];
    if (field === "parentCategory") {
      // Fetch the full parent category object from allCategories
      const parentCategory = allCategories.find((cat) => cat.id === value);
      updatedCategories[index][field] = parentCategory || null; // Assign the full object
    } else {
      updatedCategories[index][field] = value;
    }
    setCategories(updatedCategories);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/api/category/create",
        categories.map((cat) => ({
          ...cat,
          parentCategory: cat.parentCategory
            ? { id: cat.parentCategory.id }
            : null, // Ensure we send the ID of parent category
        }))
      );

      // On success, show success message and reset the form
      setSuccessMessage("Categories created successfully!");
      setCategories([
        { name: "", parentCategory: null, categoryId: "", image: "" },
      ]);
      fetchCategories(); // Refresh category list
    } catch (err) {
      console.error("Error creating categories:", err);
      setErrorMessage("Failed to create categories. Please try again.");
    } finally {
      setOpenSnackbar(true); // Show snackbar with the message
    }
  };

  // Adding a new category entry
  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { name: "", parentCategory: null, categoryId: "", image: "" },
    ]);
  };

  // Removing a category entry
  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  // Handling closing of snackbar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Handling the dialog for adding a new parent category
  const handleAddParentCategory = async () => {
    if (!newParentCategory) return;

    try {
      const response = await axios.post(
        "http://localhost:8090/api/category/create",
        [{ name: newParentCategory, parentCategory: null }]
      );
      setAllCategories((prev) => [...prev, response.data]);
      setShowDialog(false);
      setNewParentCategory("");
      setSuccessMessage("Parent category added successfully!");
    } catch (err) {
      console.error("Error adding parent category:", err);
      setErrorMessage("Failed to add parent category.");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Categories
      </Typography>
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
        >
          <TextField
            label="Category Name"
            value={category.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            required
          />
          <TextField
            label="Category ID"
            value={category.categoryId}
            onChange={(e) =>
              handleInputChange(index, "categoryId", e.target.value)
            }
            required
          />
          <TextField
            label="Image URL"
            value={category.image}
            onChange={(e) => handleInputChange(index, "image", e.target.value)}
          />
          <FormControl>
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={category.parentCategory || ""}
              onChange={(e) =>
                handleInputChange(index, "parentCategory", e.target.value)
              }
            >
              <MenuItem value={null}>None</MenuItem>
              {allCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
              <MenuItem onClick={() => setShowDialog(true)}>
                Add New Parent Category
              </MenuItem>
            </Select>
          </FormControl>
          {categories.length > 1 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveCategory(index)}
            >
              Remove Category
            </Button>
          )}
        </Box>
      ))}
      <div className="space-x-10">
        <Button variant="outlined" onClick={handleAddCategory}>
          Add Another Category
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ gap: 5 }}
          onClick={handleSubmit}
        >
          Submit Categories
        </Button>
      </div>
      {/* Dialog for Adding New Parent Category */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Add New Parent Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Parent Category Name"
            fullWidth
            value={newParentCategory}
            onChange={(e) => setNewParentCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={handleAddParentCategory} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={successMessage ? "success" : "error"}
          variant="filled"
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateCategory;
