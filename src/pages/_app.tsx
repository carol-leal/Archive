import "@/styles/globals.css";
import { useState, useMemo } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";

const darkThemeOptions = {
  palette: {
    mode: "dark" as PaletteMode,
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
};

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = useMemo(
    () =>
      createTheme(
        mode === "dark" ? darkThemeOptions : { palette: { mode: "light" } }
      ),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
