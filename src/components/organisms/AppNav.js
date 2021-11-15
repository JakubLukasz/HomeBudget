import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';
import { useHistory } from 'react-router';

import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';
import NavLink from '@Components/molecules/NavLink';
import Button from '@Components/atoms/Button';

import { useAuth } from '@Hooks/useAuth';

const Navigation = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 50px',
  backgroundColor: '#ffffff',

  '@media screen and (min-width:1024px)': {
    paddingTop: '20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    right: 'auto',
  }
})

const LinkTitle = styled(Text)(({ theme }) => ({
  fontWeight: '600',
  color: theme.palette.secondary.main,
  margin: '10px 0 0 0',
}));

const HomeLink = styled(NavLink)({
  '@media screen and (min-width: 1024px)': {
    order: -2
  }
});

const LogOutButton = styled(Button)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7rem',
  textTransform: 'capitalize',
})

const AppNav = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const logOutHandler = async () => {
    try {
      await logout();
      history.push('/login');
    } catch {
      console.error('logout error');
    }
  }

  return (
    <Navigation>
      <NavLink to="/statistics" title="Statistics" icon="Statistic" />
      <NavLink to="/expenses" title="Expenses" icon="Expense" />
      <HomeLink to="/" title="Home" icon="Home" />
      <LogOutButton secondary onClick={logOutHandler}>
        <Icon type="Logout" fontSize="large" color="secondary" />
        <LinkTitle variant="p2">Log out</LinkTitle>
      </LogOutButton>
    </Navigation>
  );
};

AppNav.propTypes = {
  logOutHandler: PropTypes.func
}

export default AppNav;
