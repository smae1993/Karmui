import * as React from 'react';
import { Box} from "@mui/material";
import Appbar from '@/Components/Appbar/Appbar';
import Footer from '@/Components/Footer';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Head } from '@inertiajs/react';
import DarkLightButton from '@/Components/Appbar/DarkLightButton';
import LocaleButton from '@/Components/Appbar/LocaleButton';
import LoginButton from '@/Components/Appbar/LoginButton';
import UserButton from '@/Components/Appbar/UserButton';

export const UserContext = React.createContext();

export default function Layout ({AppbarTitle, title = "Karmania", props, children, lefts, description, lead}){
    const [user, setUser] = React.useState( props.user);
    return (
        <SnackbarProvider>
            <UserContext.Provider value={[user, setUser]}>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', display:'flex', flexFlow: 'column'}}>
            <Head>
                <title>{title}</title>
                <meta name="author" content="Sayed Mohammad Amin Emrani" />
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="Karmania"/>
                <meta property="og:description" content="Karmania Provides IOT Devices"/>
                <meta property="og:url" content="https://karmania.net/"/>
                <meta property="og:site_name" content="Karmania"/>
                {/* <meta name="google-site-verification" content="Xwxc_5lTh73F8Km_tFD8YfcdAcsTGB-cO6GTZaHstEw" /> */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>

                <meta name="description" content={description ?? "Kerman Electronics Provides IOT Devices"} />
                <meta name="keywords"  content="kerman,electronics,kelec.ir,iot,kerman electronics,kelec,karmania,karmania electronic,karmania.net" />
            </Head>
            <Appbar
            title={AppbarTitle}
                props={props}
                rights= {lead
                    // <CategoryButton />
                }
                lefts = {<>
                {/* <SearchButton /> */}
                {props.auth.user && <><UserButton auth={props.auth}/></>}

                {!props.auth.user && <LoginButton />}

                <DarkLightButton/>
                <LocaleButton />
                {lefts}
                {/* <Autocomplete
                    options={Object.keys(locales)}
                    getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                    style={{ width: 300 }}
                    value={locale}
                    disableClearable
                    onChange={(event, newValue) => {
                        setLocale(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Locale" fullWidth />
                    )}
                /> */}
            </>}
            />
            {/* <Toolbar /> */}
            <Box sx={{flex: '1 1 auto', minHeight: '100vh',backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],}}>
                        <Box  sx={{flex: '1 1 auto', minHeight: '100vh', paddingBottom: '20px',}}>{children}</Box>
                        <Footer />
            </Box>

        </Box>
      </UserContext.Provider>
        </SnackbarProvider>

    );
}
