import { CacheProvider, ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { SnackbarProvider } from "notistack";



export default function Karmui({children}) {
    return <ThemeProvider theme={theme}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </ThemeProvider>
}