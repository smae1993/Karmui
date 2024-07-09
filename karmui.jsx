// import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from '@mui/material/styles';
// import theme from "./theme";
import { SnackbarProvider } from "notistack";



export default function Karmui({children, theme}) {
    return <ThemeProvider theme={theme}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </ThemeProvider>
}