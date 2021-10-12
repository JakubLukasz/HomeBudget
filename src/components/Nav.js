import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import StatsIcon from '../assets/images/statsIcon.svg';
import ExpensesIcon from '../assets/images/expensesIcon.svg';
import Logo from '../assets/images/homeIcon.svg';
import { devices } from '../assets/styles/devices';
import LogOutButton from './LogOutButton';
import React from 'react';

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

const LinkIcon = styled(Icon)`
  width: 3rem;
  height: 3rem;
  svg,
  ellipse {
    fill: ${({ theme }) => theme.color.secondary};
  }
`;

const LinkTitle = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1.1rem;
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.3rem;
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

const AppNav = () => {
  return (
    <Navigation>
      <StyledNavLink to="/statistics" activeClassName="open">
        <LinkIcon src={StatsIcon} />
        <LinkTitle>Statistics</LinkTitle>
      </StyledNavLink>
      <StyledNavLink to="/fixed-expenses" activeClassName="open">
        <LinkIcon src={ExpensesIcon} />
        <LinkTitle>Expenses</LinkTitle>
      </StyledNavLink>
      <HomeLink exact to="/" activeClassName="open">
        <LinkIcon src={Logo} />
        <LinkTitle>Home</LinkTitle>
      </HomeLink>
      <LogOutButton />
    </Navigation>
  );
};

export default AppNav;
