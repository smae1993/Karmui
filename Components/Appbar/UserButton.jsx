import {React, useState} from 'react';

import { Box, Button, ClickAwayListener, Fade, Menu, MenuItem, Paper, Popper, Typography } from "@mui/material";
import { FiLogOut, FiUser, FiUnlock } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from '@inertiajs/react';
import AppbarButton from './AppbarButton';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { BsBox } from 'react-icons/bs';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';


export default function UserButton({auth}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();


    const handleMenu = (event) => {
         setAnchorEl(event.currentTarget);
         setOpen(!open);
      };

      const handleClose = (event) => {
        // setAnchorEl(null);
        setOpen(false);
      };

      var UserMenuButton = ({title, icon, href, method}) => {
        return (<Link href={href} method={method}>
            <Button size="large" sx={{borderRadius: 4, width: '100%', fontSize: "25px"}} color='textColor'>
                {icon}
                <p className='flex-grow text-base'>{title}</p>

            </Button>
        </Link>);
      };








    return (
        <>
            <ClickAwayListener onClickAway={handleClose}>
            <Box>
            <AppbarButton
                // defaultText="ناحیه کاربری"
                notHovered={<RiUser3Line />}
                hovered={<RiUser3Fill />}
                aria-controls="menu-appbar"
                onClick={handleMenu}
                aria-haspopup="true"
            />

            <Popper  open={open} anchorEl={anchorEl} sx={{ zIndex: 9999, direction: 'ltr', }} placement="bottom-end" transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{borderRadius: 4,p:0.5, width: "250px",  backdropFilter:"blur(10px)", marginTop: "10px",}}>
                        <UserMenuButton
                            icon={<FiUser />}
                            title={auth.user.name}
                        />
                        {auth.user.role == "admin" && <UserMenuButton
                            href={route('admin.dashboard')}
                            icon={<MdOutlineSpaceDashboard />}
                            title={t("adminDashboard")}
                        />}






                        <UserMenuButton
                            method="post"
                            href={route('logout')}
                            icon={<FiLogOut/>}
                            title={t("logout")}
                        />

                        {/* <Link href={route('logout')} method="post">
                            <Button size="large" sx={{borderRadius: 4, width: '100%',}} color='black'>
                                <FiLogOut size={25}/>
                                <p className='flex-grow'>خروج</p>
                            </Button>
                        </Link> */}
                    </Paper>
                </Fade>
                )}
            </Popper>
            </Box>

            </ClickAwayListener>


        </>);
}
