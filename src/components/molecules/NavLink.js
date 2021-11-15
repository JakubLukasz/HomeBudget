import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import { NavLink as ReactNavLink } from 'react-router-dom';

import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';

const StyledLink = styled(ReactNavLink)(({ theme }) => ({
    textDecoration: 'none',
    padding: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&.open svg': {
        fill: theme.palette.primary.main
    }
}))

const LinkTitle = styled(Text)(({ theme }) => ({
    fontWeight: '600',
    color: theme.palette.secondary.main,
    margin: '10px 0 0 0',
}));

const NavLink = ({ className, to, title, icon }) => {
    return (
        <StyledLink className={className} exact to={to} activeClassName="open">
            <Icon type={icon} fontSize="large" color="secondary" />
            <LinkTitle variant="p2">{title}</LinkTitle>
        </StyledLink>
    )
}

NavLink.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    to: PropTypes.string
}

export default NavLink
