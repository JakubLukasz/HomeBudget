import styled from "styled-components";
import Icon from "./Icon";
import addBillIcon from "../assets/images/add.svg";
import { useAddBill } from "../contexts/AddBillContext";
import { devices } from "../assets/devices";

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
  height: 25px;
  fill: ${({ theme }) => theme.color.primary};

  @media ${devices.mobileM} {
    height: 30px;
  }

  @media ${devices.tablet} {
    height: 40px;
  }
`;

const ButtonText = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
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
