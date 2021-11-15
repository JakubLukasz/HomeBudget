import React from 'react'
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const getVariant = (variant) => {
    switch (variant) {
        case 'h1':
            return 'h1';
        case 'h2':
            return 'h2';
        case 'h3':
            return 'h3';
        case 'h4':
            return 'h4';
        case 'h5':
            return 'h5';
        case 'h6':
            return 'h6';
        case 'p1':
            return 'subtitle1';
        case 'p2':
            return 'subtitle2';
        default:
            return 'subtitle1';
    }
}

const Text = ({ children, variant, ...rest }) => {

    return (
        <Typography variant={getVariant(variant)}{...rest}>
            {children}
        </Typography>
    )
}

Text.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.string
}
export default Text
