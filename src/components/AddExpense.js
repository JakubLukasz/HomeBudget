import React from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import { useInputData } from '../hooks/useInputData';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Typography } from '@mui/material';

const AddButton = styled.button`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.laptop} {
    order: -1;
  }
`;

const IconBox = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 1rem;
  margin-bottom: 0.5rem;
`;

const AddExpense = () => {
  const { setIsExpensesModalOpen } = useInputData();

  return (
    <AddButton onClick={() => setIsExpensesModalOpen(true)}>
      <IconBox>
        <AssignmentIcon />
      </IconBox>
      <Typography variant="h6">Add Expense</Typography>
    </AddButton>
  );
};

export default AddExpense;
