import React from "react";
import { useContext, useState } from "react";
import AppbarButton from "./AppbarButton";
import {UserContext} from "@/Layouts/Layout";
import UserButton from "./UserButton";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Box, Button, ClickAwayListener, Fade, Paper, Popper, Tooltip, Typography } from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import AddToBasketAction from "../AddToBasketAction";
import { router } from '@inertiajs/react'


export default function BasketButton() {
    const [user, setUser] = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
     };

     const handleClose = (event) => {
       // setAnchorEl(null);
       setOpen(false);
     };



     var BasketVariety = ({variety}) => {
        return (<Button  size="large" sx={{borderRadius: 4, width: '100%', fontSize: "25px"}} color='black'>
                    <div dir="rtl">
                        <AddToBasketAction variety={variety}/>
                        <Typography  fontSize={12} noWrap direction="rtl">{variety.basketPrice.toLocaleString() + " تومان"}</Typography>
                    </div>
                    <Link dir="rtl" href={route('product',{'id': variety.product.id})} className='flex-grow text-base text-right'>

                    <Typography  fontSize={14} sx={{maxWidth: "200px"}} textAlign="right" noWrap>{variety.product.name}</Typography>

                            {/* <Tooltip sx={{ zIndex: 999999900000,}} title={<Typography>
                                    {variety.product.name}
                                </Typography>}>
                            </Tooltip> */}
                            <div  dir="rtl" className="flex text-right justify-start">
                            <div className="w-5 h-5 rounded-full ml-2" style={{background: "#" + variety.color.color}}/>
                                <Typography sx={{maxWidth: "200px"}} fontSize={10} textAlign="right" noWrap>{variety.displayName}</Typography>

                            </div>
                    </Link>

                    <img src={variety.thumbnail} width={40} height={40} className="rounded ml-4" />
                </Button>);
      };




    return <>
    <ClickAwayListener onClickAway={handleClose}>
            <Box>
            <AppbarButton
            // fixed={true}
            // defaultText="12"
            badgeContent={user.basket.length}
            aria-controls="menu-appbar"
            onClick={handleMenu}
            aria-haspopup="true"
            notHovered={<RiShoppingCart2Line />}
            hovered={<RiShoppingCart2Fill />}
            />

            <Popper  open={open} anchorEl={anchorEl} sx={{ zIndex: 9999, direction: 'rtl', }} placement="bottom-end" transition>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{borderRadius: 4,p:0.5, width: "400px", bgcolor: '#FEFEFE80',  backdropFilter:"blur(10px)", marginTop: "10px", borderWidth: '1px'}}>
                        <div className="flex justify-between p-2">
                            <Link href={route('basket')}><Button variant="contained" sx={{borderRadius: '15px'}}>مشاهده سبد خرید</Button></Link>
                            <Typography sx={{marginY:'auto'}}>{"مجموع " + user.basketPrice.toLocaleString() + " تومان"}</Typography>
                        </div>

                        {user.basket && user.basket.map((variety)=>{
                            return <BasketVariety key={variety.id}
                            variety={variety}
                        />
                        })}

                    </Paper>
                </Fade>
                )}
            </Popper>
            </Box>

            </ClickAwayListener>


    </>;
}
