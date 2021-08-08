import styled from "styled-components";
import Icon from "./Icon";
import logOutIcon from "../assets/images/log-out.svg";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const LogOffButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(Icon)`
  width: auto;
  height: 30px;
  fill: ${({ theme }) => theme.color.darkGray};
`;

const ButtonText = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.darkGray};
  margin: 10px 0 0 0;
`;

const LogOutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const logOutHandler = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.error("error");
    }
  };

  return (
    <LogOffButton onClick={logOutHandler}>
      <ButtonIcon src={logOutIcon} />
      <ButtonText>Log Out</ButtonText>
    </LogOffButton>
  );
};

export default LogOutButton;
