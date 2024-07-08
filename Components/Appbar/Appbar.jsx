import * as React from 'react';
import { AppBar, Toolbar, Typography } from "@mui/material";
import ApplicationLogo from '../ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Trans, useTranslation } from 'react-i18next';


export default function Appbar({title = "appbarTitle", props, lefts, rights}){
    const { t } = useTranslation();

    return (
        <>
            <AppBar position="fixed" sx={{direction: "ltr",  backdropFilter:"blur(10px)", }} color="transparent" elevation={1}>
                <Toolbar>
                {rights}
                    <Link  href={route('home')}>
                    <ApplicationLogo className="mr-2"/>
                    </Link>
                <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, marginLeft: '10px', fontFamily: 'IranYekan', fontWeight:'900', fontSize:"20px"}}
                >
                    {t(title)}
                </Typography>
                {lefts}
                </Toolbar>
            </AppBar>

        </>
    );
}
