import React from 'react';
import styled from 'styled-components';
import { useUi } from '@Hooks/useUi';
import { devices } from '@Assets/styles/devices';
import AddIcon from '@mui/icons-material/Add';
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

const AddBill = () => {
  const { setIsBillModalOpen } = useUi();

  const addBillHandler = () => setIsBillModalOpen(true);

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
