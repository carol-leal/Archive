import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#bd93f9",
    },
    secondary: {
      main: "#50fa7b",
    },
    background: {
      default: "#282a36",
      paper: "#44475a",
    },
    text: {
      primary: "#f8f8f2",
      secondary: "#6272a4",
    },
    error: {
      main: "#ff5555",
    },
    warning: {
      main: "#ffb86c",
    },
    info: {
      main: "#8be9fd",
    },
    success: {
      main: "#50fa7b",
    },
    divider: "#6272a4",
  },
});

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => setOpen(!open)}
        variant="contained"
        sx={[
          {
            color: "text.primary",
            bgcolor: { xs: "primary.main", md: "warning.main" },
            "&:hover": {
              bgcolor: { xs: "primary.dark", md: "warning.dark" },
            },
            "& > p": {
              color: "black",
            },
          },
          open && {
            bgcolor: { xs: "secondary.main", md: "error.main" },
            "&:hover": {
              bgcolor: { xs: "secondary.dark", md: "error.dark" },
            },
            "& > p": {
              color: "black",
            },
          },
        ]}
      >
        My
        <p>Button</p>
      </Button>
    </ThemeProvider>
  );
}
