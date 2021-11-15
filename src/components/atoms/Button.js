import React from 'react'
import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, secondary, ...rest }) => {

    return (
        <MuiButton variant={secondary ? "text" : "contained"} {...rest}>
            {children}
        </MuiButton>
    )
}

Button.propTypes = {
    secondary: PropTypes.bool,
    children: PropTypes.node,
}

export default Button
