import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { AddPhotoAlternateOutlined, Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { uploadToCloudinary } from "../../../Util/uploadToCloudinary";
import { createProduct } from "../../../State/seller/sellerProductSlice";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const dispatch = useAppDispatch();
  const { sellerProduct, seller } = useAppSelector((store) => store);

  const categoryThree = {
    men: menLevelThree,
    women: womenLevelThree,
    kids: [],
    home_furniture: furnitureLevelThree,
    beauty: [],
    electronics: electronicsLevelThree,
  };

  const categoryTwo = {
    men: menLevelTwo,
    women: womenLevelTwo,
    kids: [],
    home_furniture: furnitureLevelTwo,
    beauty: [],
    electronics: electronicsLevelTwo,
  };

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Gray", hex: "#808080" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Teal", hex: "#008080" },
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      brand: "",
      color: "",
      sizes: "",
      category: "",
      category2: "",
      category3: "",
      images: [],
    },
    onSubmit: async (values) => {
      dispatch(
        createProduct({ request: values, jwt: localStorage.getItem("jwt") })
      );
      console.log(values);
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);

    const images = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, images]);
    console.log(images);

    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category, parentCategoryId) => {
    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (sellerProduct.productCreated) {
      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
    if (sellerProduct.error) {
      setSnackbarMessage("Error adding product. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [sellerProduct.productCreated, sellerProduct.error]);
  return (
    <div>
      <Box sx={{ maxWidth: "auto" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none", border: "solid" }}
                onChange={handleImageChange}
                multiple
              />
              <label className="relative" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex items-center justify-center
                p-3 border rounded-md border-gray-400"
                >
                  <AddPhotoAlternateOutlined className="text-gray-700" />
                </span>
                {uploadImage && (
                  <div
                    className="absolute left-0 right-0 top-0 bottom-0 w-24 
                  h-24 flex justify-center items-center"
                  >
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      key={index}
                      alt={`ProductImage ${index + 1}`}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                required
                rows={4}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                fullWidth
                id="mrp_price"
                name="mrpPrice"
                label="MRP Price"
                type="number"
                value={formik.values.mrpPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)
                }
                helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                fullWidth
                id="sellingPrice"
                name="sellingPrice"
                label="Selling Price"
                type="number"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.sellingPrice &&
                  Boolean(formik.errors.sellingPrice)
                }
                helperText={
                  formik.touched.sellingPrice && formik.errors.sellingPrice
                }
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                name="brand"
                label="Brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 6 }}>
              <FormControl
                fullWidth
                error={formik.touched.color && Boolean(formik.errors.color)}
                required
              >
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId="color-label"
                  id="color"
                  name="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  label="Color"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {colors.map((color, index) => (
                    <MenuItem value={color.name}>
                      <div className="flex gap-3">
                        <span
                          style={{ backgroundColor: color.hex }}
                          className={`h-5 w-5
                        rounded-full ${color.name === "White" ? "border" : ""}
                        `}
                        ></span>
                        <p>{color.name}</p>
                      </div>
                    </MenuItem>
                  ))}
                </Select>

                {formik.touched.color && formik.errors.color && (
                  <FormHelperText error>{formik.errors.color}</FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 6 }}>
              <FormControl
                fullWidth
                error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                required
              >
                <InputLabel id="sizes-label">Sizes</InputLabel>
                <Select
                  labelId="sizes-label"
                  id="sizes"
                  name="sizes"
                  value={formik.values.sizes}
                  onChange={formik.handleChange}
                  label="Sizes"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="FREE">Free</MenuItem>
                  <MenuItem value="XS">XS</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
                {formik.touched.sizes && formik.errors.sizes && (
                  <FormHelperText>{formik.errors.sizes}</FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                required
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  label="Category"
                >
                  {mainCategory.map((item) => (
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                required
              >
                <InputLabel id="category2-label">Second Category</InputLabel>
                <Select
                  labelId="category2-label"
                  id="category2"
                  name="category2"
                  value={formik.values.category2}
                  onChange={formik.handleChange}
                  label="Second Category"
                >
                  {formik.values.category &&
                    categoryTwo[formik.values.category]?.map((item) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                required
              >
                <InputLabel id="category-label">Third Category</InputLabel>
                <Select
                  labelId="category3-label"
                  id="category"
                  name="category3"
                  value={formik.values.category3}
                  onChange={formik.handleChange}
                  label="Third Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {formik.values.category2 &&
                    childCategory(
                      categoryThree[formik.values.category],
                      formik.values.category2
                    )?.map((item) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid2>
            <Grid2>
              <Button
                sx={{ p: "14px" }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={sellerProduct.loading}
              >
                {sellerProduct.loading ? (
                  <CircularProgress
                    size="small"
                    sx={{ width: "27px", height: "27px" }}
                  />
                ) : (
                  "Add Product"
                )}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
