import { createTheme } from "@mui/material";
import { componentsOverrides } from "./Overrides";

export const DarkTheme = createTheme({
  components: {
    ...componentsOverrides,
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: "#fced18",
    },
    text: {
      primary: "#f6f8fc",
      secondary: "#f1f1f1",
    },
    mode: "dark",
    background: {
      default: "#1c1c1c",
      paper: "#242424",
    },
  },
});
