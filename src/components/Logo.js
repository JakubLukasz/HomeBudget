import Icon from "./Icon";
import LogoSrc from "../assets/images/logo.svg";
import styled from "styled-components";

const LogoSVG = styled(Icon)`
  width: auto;
  height: 30px;
`;

const Logo = () => {
  return <LogoSVG src={LogoSrc}></LogoSVG>;
};

export default Logo;
