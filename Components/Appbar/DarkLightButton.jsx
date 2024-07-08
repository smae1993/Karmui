import React from "react";
import AppbarButton from "./AppbarButton";
// import ColorModeContext from "@/app.jsx";
import { MdDarkMode, MdLightMode, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useContext, useState } from "react";
import { ColorModeContext } from "@/Karmania";
import Cookies from 'universal-cookie';



export default function DarkLightButton (){
    const [mode, setMode] = useContext(ColorModeContext);
    const cookies = new Cookies();
    // console.log(colorMode);
    return <AppbarButton
    notHovered={ mode === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode/>}
    hovered={ mode === "light" ? <MdDarkMode /> : <MdLightMode/>}
    onClick={()=> {
        cookies.set("mode", mode === "light" ? "dark" : "light");
        setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );


    }}
    />;
}
