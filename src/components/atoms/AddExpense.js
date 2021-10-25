import React from 'react';
import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import { useUi } from '../../hooks/useUi';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Typography } from '@mui/material';
import { styled as restyled } from '@mui/styles';

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

const IconBox = restyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  padding: '1rem',
  marginBottom: '0.5rem',
}));

const AddExpense = () => {
  const { setIsExpensesModalOpen } = useUi();

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
