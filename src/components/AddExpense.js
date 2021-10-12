import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import AddExpenseIcon from '../assets/images/AddExpenseIcon.svg';
import { devices } from '../assets/styles/devices';
import { useInputData } from '../hooks/useInputData';

const AddExpenseButton = styled.button`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.laptop} {
    order: -1;
  }
`;

const ButtonIcon = styled(Icon)`
  width: 5rem;
  height: 5rem;
  fill: ${({ theme }) => theme.color.primary};
`;

const ButtonText = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.primary};
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.4rem;
  }
`;

const AddExpense = () => {
  const { setIsExpensesModalOpen } = useInputData();

  const addExpenseHandler = () =>
    setIsExpensesModalOpen((snapshot) => !snapshot);

  return (
    <AddExpenseButton onClick={addExpenseHandler}>
      <ButtonIcon src={AddExpenseIcon} />
      <ButtonText>Add Expense</ButtonText>
    </AddExpenseButton>
  );
};

export default AddExpense;
