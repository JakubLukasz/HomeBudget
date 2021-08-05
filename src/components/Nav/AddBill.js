import styled from "styled-components";
import Icon from "../Icon";
import addBillIcon from "../../assets/images/add.svg";
import { useAuth } from "../../contexts/AuthContext";

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  width: auto;
  height: 30px;
  fill: ${({ theme }) => theme.color.primary};
`;

const StyledSpan = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.darkGray};
  margin: 10px 0 0 0;
`;

const AddBill = () => {
  const { currentUser } = useAuth();
  const { email, uid } = currentUser;
  const display = () => {
    console.log({ email, uid });
  };

  return (
    <StyledButton onClick={display}>
      <StyledIcon src={addBillIcon} />
      <StyledSpan>Add Bill</StyledSpan>
    </StyledButton>
  );
};

export default AddBill;
