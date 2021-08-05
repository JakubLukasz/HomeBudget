import styled from "styled-components";
import Icon from "../Icon";
import statsIcon from "../../assets/images/stats.svg";
import settingsIcon from "../../assets/images/settings.svg";
import { Link } from "react-router-dom";
import AddBill from "./AddBill";
import planIcon from "../../assets/images/plan.svg";
import LogOutButton from "./LogOutButton";

const StyledNav = styled.nav`
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
`;

const StyledIcon = styled(Icon)`
  width: auto;
  height: 30px;
  svg {
    fill: ${({ theme }) => theme.color.darkGray};
  }
`;

const StyledSpan = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.darkGray};
  margin: 10px 0 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppNav = () => {
  return (
    <StyledNav>
      <StyledLink to="/statistics">
        <StyledIcon src={statsIcon} />
        <StyledSpan>Statistics</StyledSpan>
      </StyledLink>
      <StyledLink to="/plans">
        <StyledIcon src={planIcon} />
        <StyledSpan>Plans</StyledSpan>
      </StyledLink>
      <AddBill />
      <StyledLink to="/settings">
        <StyledIcon src={settingsIcon} />
        <StyledSpan>Settings</StyledSpan>
      </StyledLink>
      <LogOutButton></LogOutButton>
    </StyledNav>
  );
};

export default AppNav;
