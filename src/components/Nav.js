import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import AddBill from './AddBill';
import statsIcon from '../assets/images/stats.svg';
import planIcon from '../assets/images/plan.svg';
import Logo from '../assets/images/logo.svg';
import { devices } from '../assets/styles/devices';
import LogOutButton from './LogOutButton';
import React from 'react';

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
  background-color: ${({ theme }) => theme.color.white};

  @media ${devices.laptop} {
    padding-top: 20px;
    flex-direction: column;
    align-items: flex-start;
    right: auto;
  }
`;

const LinkIcon = styled(Icon)`
  width: 2.5rem;
  height: 2.5rem;
  svg {
    fill: ${({ theme }) => theme.color.secondary};
  }
`;

const LinkTitle = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeLink = styled(NavLink)`
  @media ${devices.laptop} {
    order: -2;
  }
`;

const AppNav = () => {
  return (
    <Navigation>
      <NavLink to="/statistics">
        <LinkIcon src={statsIcon} />
        <LinkTitle>Statistics</LinkTitle>
      </NavLink>
      <NavLink to="/fixed-expenses">
        <LinkIcon src={planIcon} />
        <LinkTitle>Expenses</LinkTitle>
      </NavLink>
      <AddBill />
      <HomeLink to="/">
        <LinkIcon src={Logo} />
        <LinkTitle>Home</LinkTitle>
      </HomeLink>
      <LogOutButton />
    </Navigation>
  );
};

export default AppNav;
