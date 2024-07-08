import { Link } from "@inertiajs/inertia-react";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdOutlineNavigateBefore } from "react-icons/md";

// export const StyledBreadcrumbs = styled(Breadcrumbs)`
//   .MuiBreadcrumbs-li {
//     overflow: scroll;

//     flex: 1;
//   }
// `;

export default function Navigator({navigators}){
    return (
        <Breadcrumbs sx={{marginBottom: "15px", overflow:'scroll'}}
        separator={<MdOutlineNavigateBefore size={24}  />}

        aria-label="breadcrumb">
            {navigators.list && navigators.list.map( (navigator) => {
            return <Link href={navigator.link}  key={navigator.name}>
                        <Button variant="text" color="black">
                            {navigator.name}
                        </Button>
                    </Link>})}
        </Breadcrumbs>

    );
}
