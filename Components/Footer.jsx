import { Box, Card, Typography } from "@mui/material";
import AppbarButton from "./Appbar/AppbarButton";
import { RiInstagramFill, RiInstagramLine, RiWhatsappFill, RiWhatsappLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { IoCall, IoCallOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";


export default function Footer(){
    const { t } = useTranslation();

    return <Card sx={{direction: "ltr"}} className="grid grid-cols-1 md:grid-cols-2 p-2" style={{'boxShadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)'}}>
        <Typography className=" text-center md:text-start p-2">{t("footerTitle")}</Typography>
        <div className="flex justify-center md:justify-end">
            <AppbarButton
                href="tel:+989136336002"
                defaultText={t("call")}
                hovered={<IoCall/>}
                notHovered={<IoCallOutline />}
            />
            <AppbarButton
            newTab={true}
            href="https://wa.me/+989136336002"
                defaultText={t("whatsapp")}
                hovered={<RiWhatsappFill/>}
                notHovered={<RiWhatsappLine />}
            />
            <AppbarButton
            newTab={true}
                href="https://t.me/+CukhAk1-7zRiYjQ0"
                defaultText={t("telegram")}
                hovered={<FaTelegramPlane/>}
                notHovered={<FaTelegramPlane />}
            />
            <AppbarButton
            newTab={true}
                href="https://instagram.com/choobargallery.ir"
                defaultText={t("instagram")}
                hovered={<RiInstagramFill/>}
                notHovered={<RiInstagramLine />}
            />
            {/* <AppbarButton
            newTab={true}
            href="https://trustseal.enamad.ir/?id=333076&amp;Code=pK8Jhkf33AOTqqMyr5LS"
                fixed={true}
                defaultText="نماد اعتماد"
                hovered={<Enamad hovered={true}/>}
                notHovered={<Enamad />}
            /> */}

        </div>
        {/* <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=333076&amp;Code=pK8Jhkf33AOTqqMyr5LS"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=333076&amp;Code=pK8Jhkf33AOTqqMyr5LS" alt=""  id="pK8Jhkf33AOTqqMyr5LS"/></a> */}
    </Card>;
}
