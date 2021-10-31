import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { devices } from '@Assets/styles/devices';
import { Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled as restyled } from '@mui/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

  @media ${devices.laptop} {
    margin: 100px 0;
  }
`;

const IconBox = restyled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '1rem',
  borderRadius: '10px',
  marginBottom: '2rem',
}));

const ExpenseIcon = styled(AssignmentIcon)`
  font-size: 6.25rem;

  @media ${devices.laptop} {
    font-size: 9rem;
  }
`;

const TransactionIcon = styled(AccountBalanceWalletIcon)`
  font-size: 6.25rem;

  @media ${devices.laptop} {
    font-size: 9rem;
  }
`;

const NoData = ({ text, expense }) => {
  return (
    <Container>
      <IconBox>{expense ? <ExpenseIcon /> : <TransactionIcon />}</IconBox>
      <Typography variant="subtitle1" component="p">
        {text}
      </Typography>
    </Container>
  );
};

NoData.propTypes = {
  text: PropTypes.string,
  expense: PropTypes.bool,
};

export default NoData;
