import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


// Create a custome button with the Tips etc already included
// Looks better in the code
export default ({ children, onClick, tip, btnClassName, tipClassName,}) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)