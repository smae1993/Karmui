import { RiSearchLine } from "react-icons/ri";
import AppbarButton from "./AppbarButton";
import SearchDialog from "@/Pages/General/SearchDialog";
import { useState } from "react";


export default function SearchButton (){
    const [openSearch, setOpenSearch] = useState(false);
    return (<>
        <SearchDialog open={openSearch} setOpen={setOpenSearch}/>
        <AppbarButton
            notHovered={<RiSearchLine />}
            hovered={<RiSearchLine />}
            onClick={()=> setOpenSearch(true)}
            defaultText="جستجو"
        />
    </>);
}
