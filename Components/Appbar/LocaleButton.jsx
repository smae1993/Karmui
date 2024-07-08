import { Box, Button, ClickAwayListener, Fade, Paper } from "@mui/material";
import React from "react";
import AppbarButton from "./AppbarButton";
import { Popper } from "@mui/base";
import { LocaleContext } from '@/Karmania';

import Cookies from 'universal-cookie';
import { MdOutlineLanguage } from "react-icons/md";



export default function LocaleButton(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [locale, setLocale] = React.useContext(LocaleContext);
    const cookies = new Cookies();

    const handleMenu = (event) => {
         setAnchorEl(event.currentTarget);
         setOpen(!open);
      };

      const changeLocale = (locale) => {
        cookies.set("locale", locale)
        handleClose();
         setLocale(locale);
      }
      const handleClose = (event) => {
        // setAnchorEl(null);
        setOpen(false);
      };


      var LangButton = ({title, locale}) => {
        return (<Button size="large" sx={{borderRadius: 4, width: '100%', fontSize: "25px"}} color='textColor' onClick={() => changeLocale(locale)}>
        <p className='flex-grow text-base'>{title}</p>

    </Button>);
      };





      return (
        <>
            <ClickAwayListener onClickAway={handleClose}>
            <Box>
            <AppbarButton
                fixed={true}
                defaultText={locale == "faIR" ? "فارسی" : "English"}
                notHovered={<MdOutlineLanguage />}
                hovered={<MdOutlineLanguage />}
                aria-controls="menu-appbar"
                onClick={handleMenu}
                aria-haspopup="true"
            />

            <Popper  open={open} anchorEl={anchorEl} sx={{ zIndex: 9999, direction: 'ltr', }} placement="bottom-end" transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{borderRadius: 4,p:0.5, width: "100px",   backdropFilter:"blur(10px)", marginTop: "20px",}}>

                        <LangButton
                            title="English"
                            locale="enUS"
                        />
                        <LangButton
                            title="فارسی"
                            locale="faIR"
                        />

                    </Paper>
                </Fade>
                )}
            </Popper>
            </Box>

            </ClickAwayListener>


        </>);
}
