// import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
// import theme from "./theme";
import { SnackbarProvider } from "notistack";

export default function Karmui({ children, theme }) {
  return (<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}
