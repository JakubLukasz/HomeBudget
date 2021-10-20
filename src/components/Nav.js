import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '@mui/material';

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
  background-color: #ffffff;

  @media ${devices.laptop} {
    padding-top: 20px;
    flex-direction: column;
    align-items: flex-start;
    right: auto;
  }
`;

const LinkTitle = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 0.7rem;
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 0.8rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.open svg {
    fill: ${({ theme }) => theme.color.primary};
  }
`;

const HomeLink = styled(StyledNavLink)`
  @media ${devices.laptop} {
    order: -2;
  }
`;

const LogOutButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  text-transform: capitalize;
`;

const AppNav = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const logOutHandler = async () => {
    try {
      await logout();
      history.push('/login');
    } catch {
      console.error('error');
    }
  };

  return (
    <Navigation>
      <StyledNavLink to="/statistics" activeClassName="open">
        <EqualizerIcon color="secondary" fontSize="large" />
        <LinkTitle>Statistics</LinkTitle>
      </StyledNavLink>
      <StyledNavLink to="/fixed-expenses" activeClassName="open">
        <AssignmentIcon color="secondary" fontSize="large" />
        <LinkTitle>Expenses</LinkTitle>
      </StyledNavLink>
      <HomeLink exact to="/" activeClassName="open">
        <HomeIcon color="secondary" fontSize="large" />
        <LinkTitle>Home</LinkTitle>
      </HomeLink>
      <LogOutButton onClick={logOutHandler}>
        <LogoutIcon color="secondary" fontSize="large" />
        <LinkTitle>Log out</LinkTitle>
      </LogOutButton>
    </Navigation>
  );
};

export default AppNav;
