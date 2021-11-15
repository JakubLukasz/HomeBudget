import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';
import { Link as ReactLink } from 'react-router-dom';

const StyledLink = styled(ReactLink)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none'
}));

const Link = ({ className, to, children, }) => {
    return (
        <StyledLink className={className} to={to} >
            {children}
        </StyledLink>
    )
}

Link.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    to: PropTypes.string,

}

export default Link
