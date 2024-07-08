import React from "react";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import CategorySelector from "../Dialogs/CategorySelector";
import AppbarButton from "./AppbarButton";
import { Inertia } from "@inertiajs/inertia";



export default function CategoryButton() {
    const [openCatSelector, setOpenCatSelector] = React.useState(false);

    const categorySelector = (catId)=>{
        Inertia.visit(route('category', {id : catId}))
    }
    return <>
    <CategorySelector
            open={openCatSelector}
            setOpen={setOpenCatSelector}
            callback={categorySelector}
        />
        <AppbarButton
            notHovered={<MdOutlineDashboard />}
            hovered={<MdDashboard />}
            defaultText="دسته بندی"
            onClick={()=> setOpenCatSelector(true)}
        />
    </>;
}
