import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import AddBill from "./AddBill";
import statsIcon from "../assets/images/stats.svg";
import settingsIcon from "../assets/images/settings.svg";
import planIcon from "../assets/images/plan.svg";
import moreIcon from "../assets/images/more.svg";
import Logo from "../assets/images/logo.svg";
import { devices } from "../assets/devices";
import { useState } from "react";
import LogOutButton from "./LogOutButton";

const Navigation = styled.nav`
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
  background-color: ${({ theme }) => theme.color.white};
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

const LinkIcon = styled(Icon)`
  width: auto;
  height: 25px;
  svg,
  path {
    fill: ${({ theme }) => theme.color.secondary};
  }

  @media ${devices.mobileM} {
    height: 30px;
  }

  @media ${devices.tablet} {
    height: 40px;
  }
`;

const LinkTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubNav = styled.nav`
  display: none;
  position: absolute;
  bottom: 100%;
  background-color: white;

  &.open {
    display: block;
  }
`;

const MoreContainer = styled.div`
  position: relative;
`;

const AppNav = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

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
      <NavLink to="/">
        <LinkIcon src={Logo} />
        <LinkTitle>Home</LinkTitle>
      </NavLink>
      <MoreContainer>
        <NavButton onClick={() => setIsSubMenuOpen((snapshot) => !snapshot)}>
          <LinkIcon src={moreIcon} />
          <LinkTitle>More</LinkTitle>
        </NavButton>
        <SubNav className={isSubMenuOpen && "open"}>
          <LogOutButton />
          <NavLink to="/settings">
            <LinkIcon src={settingsIcon} />
            <LinkTitle>Settings</LinkTitle>
          </NavLink>
        </SubNav>
      </MoreContainer>
    </Navigation>
  );
};

export default AppNav;
