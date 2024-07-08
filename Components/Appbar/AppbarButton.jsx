import * as React from 'react';

import { Badge, Button, Collapse, Fade, Grow, Typography } from "@mui/material";


export default function AppbarButton({notHovered, hovered, fixed, defaultText, aria_controls, onClick,aria_haspopup, badgeContent, href, newTab = false}){
    const [image, setImage] = React.useState(notHovered);
    const [color, setColor] = React.useState('textColor');
    const [text, setText] = React.useState('');

    const onHoverChanged = (isHovered) => {
        setImage(isHovered ? hovered : notHovered);
        setColor(isHovered ? 'primary' : 'textColor');
        setText(isHovered ? defaultText: '');
    }




    return (
        <Button
        href= {href}
        target={newTab ? "_blank" : ""}
            variant="text"
            color= {color}
            sx={{display: 'flex', fontSize: '25px', padding: '5px', marginRight: '5px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}
            onMouseEnter={() => onHoverChanged(true)}
            onMouseLeave={() => onHoverChanged(false)}
            aria-controls = {aria_controls}
            onClick = {onClick}
            aria-haspopup = {aria_haspopup}
            >
            <Badge badgeContent={badgeContent} color="primary" max={99}
            sx={{ "& .MuiBadge-badge": { fontFamily: 'Iran Yekan' }}}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                {image}
            </Badge>


            {defaultText && <Collapse in={text !== '' || fixed}  orientation="horizontal" timeout={300} easing={{enter: "linear", exit: "linear"}}>
            <Typography fontSize="14px" sx={{marginX: '5px'}} noWrap={true}>
            {defaultText}
            </Typography>
            </Collapse>}

        </Button>

    );
}

// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
//     '& .MuiBadge-badge': {
//       right: -3,
//       top: 13,
//       border: `2px solid ${theme.palette.background.paper}`,
//       padding: '0 4px',
//     },
//   }));
