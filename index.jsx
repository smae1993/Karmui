import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import {cache} from "react";
import { prefixer } from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import Colors from "./Constants/Colors.jsx";
import * as locales from '@mui/material/locale';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


export const ColorModeContext = React.createContext()
export const LocaleContext = React.createContext()
import Cookies from 'universal-cookie';
import i18nResources from "./i18n/i18nResources";
import { SnackbarProvider } from "notistack";


i18n
.use(initReactI18next) // passes i18n down to react-i18next
.init({
  resources: i18nResources.resources,
  lng: "enUS", // if you're using a language detector, do not define the lng option
  fallbackLng: "enUS",
  interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  }
});


export default function Karmui({children}) {
    const cookies = new Cookies();
    const [mode, setMode] = React.useState(cookies.get("mode") ?? "light");
    const [locale, setLocale] = React.useState(cookies.get("locale") ?? 'enUS');

    i18n.changeLanguage(locale);
    // const colorMode = React.useMemo(
    //     () => ({
    //         // The dark mode switch would invoke this method
    //         toggleColorMode: () => {
    //             setMode((prevMode) =>
    //                 prevMode === "light" ? "dark" : "light"
    //             );
    //         },
    //     }),
    //     []
    // );



    // Update the theme only if the mode changes
    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    const themeWithLocale = React.useMemo(
        () => createTheme(theme, locales[locale]),
        [locale, theme],
      );




    return (
        <ColorModeContext.Provider value={[mode, setMode]}>
            <LocaleContext.Provider value={[locale, setLocale]}>
            <CacheProvider value={locale == "faIR" ? cacheRtl : cacheLtr}>
                <ThemeProvider theme={themeWithLocale}>
                <SnackbarProvider>
                    {children}
                </SnackbarProvider>
                </ThemeProvider>
            </CacheProvider>

            </LocaleContext.Provider>
        </ColorModeContext.Provider>

    );
}


const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
    key: "muiltr",

});

const getDesignTokens = (mode) => ({
    backDrop: {
        backdropFilter: "blur(10px)",
      },
    palette: {
        mode: mode,
        ...(mode === "light"
            ? {
                // palette values for light mode
                boxColor: {
                    main: "#EEEEEE",
                    darker: "#EEEEEE",
                },
                primary: {
                    main: Colors.LightColors.primary,
                },

                black: {
                    main: Colors.BlackColor,
                    darker: "#2c2e30",
                },
                textColor: {
                    main: Colors.BlackColor,
                },
                dialogB: {
                    main: Colors.WhiteColor,
                    darker: Colors.WhiteColor,
                },
                indigo: {
                    main: "#3F51B5",
                    darker: "#3F51B5",
                }
              }
            : {
                  // palette values for dark mode
                  boxColor: {
                    main: "#3d3d3d",
                    darker: "#3d3d3d",
                },
                  primary: {
                    main: Colors.DarkColors.primary,
                },
                black: {
                    main: Colors.BlackColor,
                },
                textColor: {
                    main: Colors.WhiteColor,
                },
                dialogB: {
                    main: Colors.BlackColor,
                    darker: Colors.BlackColor,
                },
                indigo: {
                    main: "#3F51B5",
                    darker: "#3F51B5",
                  }
              }),
    },

    typography: {
        allVariants: {
            fontFamily: "IranYekan",
            textTransform: "none",
            // fontSize: 16,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        display: "none",
                        backgroundColor: "#FFFFFF",
                    },
                },



            },
        },
        // MuiDialog: {
        //     styleOverrides: {
        //         // bgcolor: (theme) => `${theme.palette.boxColor.main}80` ,

        //       paperWidthXs: {
        //         width: 200,
        //         bgColor: "transparent",
        //         backdropFilter:"blur(10px)",
        //         borderRadius: 15,
        //       },
        //       paperWidthMd: {
        //         width: 500,
        //         bgColor: "transparent",
        //         backdropFilter:"blur(10px)",
        //         borderRadius: 15,
        //       },
        //     },
        //   },
    },
});

//   const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//       primary: {
//         main: colors.primaryColor
//     },
//     black: {
//       main: colors.black,
//       darker: '#2c2e30',
//     },
//     },
//     typography: {
//         allVariants: {
//             fontFamily: 'Vazirmatn FD',
//             textTransform: 'none',
//             // fontSize: 16,
//           },
//       },

//       components: {
//         MuiCssBaseline: {
//           styleOverrides: {
//             body: {
//               "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
//                 display: "none",
//                 backgroundColor: "#FFFFFF",
//               },
//             },
//           },
//         },
//       },
//   });

// const theme = createTheme({
//     direction: 'rtl',
//     palette: {

//         primary: {
//             main: colors.primaryColor
//         },
//         black: {
//           main: colors.black,
//           darker: '#2c2e30',
//         },

//     },
//     typography: {
//       allVariants: {
//           fontFamily: 'Vazirmatn FD',
//           textTransform: 'none',
//           // fontSize: 16,
//         },
//     },

//     components: {
//       MuiCssBaseline: {
//         styleOverrides: {
//           body: {
//             "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
//               display: "none",
//               backgroundColor: "#FFFFFF",
//             },
//           },
//         },
//       },
//     },

//   });
