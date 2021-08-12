import styled from "styled-components";
import Icon from "./Icon";
import MoreIcon from "../assets/images/more.svg";

const OpenMoreButton = styled.button`
  border: none;
  background: none;
`;

const MoreButton = () => {
  return (
    <OpenMoreButton>
      <Icon src={MoreIcon} />
    </OpenMoreButton>
  );
};

export default MoreButton;
