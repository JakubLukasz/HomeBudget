import styled from "styled-components";
import Icon from "./Icon";
import addBillIcon from "../assets/images/add.svg";
import { useAddBill } from "../contexts/AddBillContext";

const AddButton = styled.button`
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
  fill: ${({ theme }) => theme.color.primary};
`;

const ButtonText = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.darkGray};
  margin: 10px 0 0 0;
`;

const AddBill = () => {
  const { setIsPopupOpen } = useAddBill();

  const addBillHandler = () => setIsPopupOpen((snapshot) => !snapshot);

  return (
    <AddButton onClick={addBillHandler}>
      <ButtonIcon src={addBillIcon} />
      <ButtonText>Add Bill</ButtonText>
    </AddButton>
  );
};

export default AddBill;
