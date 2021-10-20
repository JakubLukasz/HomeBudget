import React from 'react';
import styled from 'styled-components';
import { useInputData } from '../hooks/useInputData';
import { devices } from '../assets/styles/devices';
import AddIcon from '@mui/icons-material/Add';
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

const AddBill = () => {
  const { setIsBillModalOpen } = useInputData();

  const addBillHandler = () => setIsBillModalOpen((snapshot) => !snapshot);

  return (
    <AddButton onClick={addBillHandler}>
      <IconBox>
        <AddIcon />
      </IconBox>
      <Typography variant="h6">Add Bill</Typography>
    </AddButton>
  );
};

export default AddBill;
