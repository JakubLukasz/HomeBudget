import styled from "styled-components";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.color.white};
  height: 10vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
    </Container>
  );
};

export default Header;
