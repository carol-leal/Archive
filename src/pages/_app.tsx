import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider, createTheme } from "@mui/material/styles";
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
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
