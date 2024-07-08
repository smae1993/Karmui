import { LocaleContext } from "@/Karmania";
import { Backdrop, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";



export default function KarmaniaDialog({ open, onClose, width = "400px", children}){
    const [locale, setLocale] = React.useContext(LocaleContext);

    return <Dialog
    slots={{ backdrop: Backdrop }}
    slotProps={{
        backdrop: {
        sx: {
            //Your style here....
            // backgroundColor: 'rgba(69, 89, 167, 0.4)',
            backdropFilter:"blur(5px)",
        },
        },
    }}

    PaperProps={{
      style: {borderRadius: 16, width:{width}}
       }}
        maxWidth="lg"
    //   maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      dir={locale == "faIR" ? "rtl" : "ltr"}
    >
        {children}

        </Dialog>;
}
