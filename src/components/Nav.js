import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import AddBill from "./AddBill";
import LogOutButton from "./LogOutButton";
import statsIcon from "../assets/images/stats.svg";
import settingsIcon from "../assets/images/settings.svg";
import planIcon from "../assets/images/plan.svg";

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
  height: 30px;
  svg {
    fill: ${({ theme }) => theme.color.secondary};
  }
`;

const LinkTitle = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 10px 0 0 0;
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
      <NavLink to="/settings">
        <LinkIcon src={settingsIcon} />
        <LinkTitle>Settings</LinkTitle>
      </NavLink>
      <LogOutButton />
    </Navigation>
  );
};

export default AppNav;
