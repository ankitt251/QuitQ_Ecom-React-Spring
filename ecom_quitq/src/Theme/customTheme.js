import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#B88E2F",
    },
    secondary: {
      main: "#FFF3E3",
    },
    hoveredCol: {
      main: "#825e0c",
    },
  },
});

export default customTheme;
