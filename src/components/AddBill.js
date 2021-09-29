import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import AddBillIcon from '../assets/images/addBillIcon.svg';
import { useInputData } from '../hooks/useInputData';
import { devices } from '../assets/styles/devices';

const AddButton = styled.button`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.laptop} {
    order: -1;
  }
`;

const ButtonIcon = styled(Icon)`
  width: auto;
  height: 2.5rem;
  fill: ${({ theme }) => theme.color.primary};
`;

const ButtonText = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
`;

const AddBill = () => {
  const { setIsModalOpen } = useInputData();

  const addBillHandler = () => setIsModalOpen((snapshot) => !snapshot);

  return (
    <AddButton onClick={addBillHandler}>
      <ButtonIcon src={AddBillIcon} />
      <ButtonText>Add Bill</ButtonText>
    </AddButton>
  );
};

export default AddBill;
