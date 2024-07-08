import { Cookies } from "react-cookie";
import Layout from "./Layout";
import React from "react";
import { Link } from "@inertiajs/react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, Toolbar, Typography } from "@mui/material";
import { RiDashboardLine, RiLayoutMasonryLine, RiOutletLine } from "react-icons/ri";
import { FiInbox, FiUser } from "react-icons/fi";
import Hamburger from "hamburger-react";


import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { HiOutlineArchiveBox, HiOutlineLightBulb } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";


export default function AdminLayout({
    AppbarTitle,
    title,
    props,
    children,
    lefts,
    description,
}) {
    const { t } = useTranslation();
    const cookies = new Cookies();
    const [open, setOpen] = React.useState(true
    );
    const toggleDrawer = () => {
        cookies.set("adminDashboardOpen", !open);
        setOpen(!open);
    };

    var AdminLayoutButton = ({ title, icon, href, tag, open }) => {
        return (
            <Link href={href}>
                <ListItemButton
                    autoFocus={props && props.navigator && props.navigator.tag === tag}
                    sx={{
                        width: open ? "200px" : "50px",
                        borderRadius: "12px",
                        mx: "5px !important",
                        fontSize: "25px",
                        my: "5px !important",
                        color:
                        props && props.navigator && props.navigator.tag === tag
                                ? "primary"
                                : "textColor",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: "40px",
                            color:
                                (props && props.navigator && props.navigator.tag === tag)
                                    ? "primary"
                                    : "textColor",
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <Typography
                        fontSize="16px"
                        sx={{ marginX: "5px" }}
                        noWrap={true}
                    >
                        {title}
                    </Typography>
                    {/* <ListItemText primary={title} sx={{ textAlign:'right' }}/> */}
                </ListItemButton>
            </Link>
        );
    };

    return <Layout
                props={props}
                lead={<Hamburger rounded size={24} distance="sm" toggle={toggleDrawer} toggled= {open} />}
                lefts={lefts}
    >
        <Toolbar />
        <Box sx={{ display: 'flex', direction:"ltr", flexGrow: "1", overflow:"hidden"}} color="boxColor">
            <Collapse in={open} orientation="horizontal" collapsedSize={80}  sx={{zIndex: '999', mt: "10px", mx: "10px", height:"100%", minHeight: "100vh",  overflowY:"scroll", borderRadius:"12px", width: "220px", bgcolor: (theme) => `${theme.palette.boxColor.main}80` , backdropFilter:"blur(10px)" }}>
            {/* <Toolbar /> */}
            <List component="nav" sx={{paddingX: "5px", width: "220px"}} color="transparent">
                    <AdminLayoutButton
                    tag="Dashboard"
                    icon={<MdOutlineSpaceDashboard/>}
                        title={t("dashboard")}
                        open={open}
                    />
                    <AdminLayoutButton
                    icon={<IoHomeOutline />}
                        title={t("buildings")}
                        open={open}
                    />
                    <AdminLayoutButton
                    icon={<RiOutletLine />}
                        title={t("devices")}
                        open={open}
                        href={route("admin.deviceType.index")}
                    />
                    <AdminLayoutButton
                    icon={<HiOutlineLightBulb />}
                        title={t("items")}
                        open={open}
                        href={route("admin.itemType.index")}
                    />
                    <AdminLayoutButton
                    icon={<FiUser />}
                        title={t("users")}
                        open={open}
                    />

            </List>
            </Collapse>
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                padding: "20px",
                overflow:"scroll",
            }}
            >
                <Toolbar />
            {window.innerWidth >= 760 && children}

            </Box>
            {window.innerWidth < 760 && <div className="absolute mt-4 mr-24">{children}</div>}
        </Box>
        <div>

        </div>

    </Layout>;
}
