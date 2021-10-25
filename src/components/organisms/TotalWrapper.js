import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';
import AddBill from '../atoms/AddBill';
import AddExpense from '../atoms/AddExpense';
import { Typography } from '@mui/material';

const Heading = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  color: ${({ moneyLeft }) => (moneyLeft < 0 ? '#f44c4c' : '#000000')};

  @media ${devices.tablet} {
    padding: 0 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
`;

const Controls = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0px;
`;

const TotalWrapper = ({ moneyLeft, currency }) => {
  return (
    <Container>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600 }}
        color="secondary"
      >
        Money left
      </Typography>
      <Heading moneyLeft={moneyLeft}>
        {moneyLeft} {currency}
      </Heading>
      <Controls>
        <AddBill />
        <AddExpense />
      </Controls>
    </Container>
  );
};

TotalWrapper.propTypes = {
  moneyLeft: PropTypes.number,
  currency: PropTypes.string,
};

export default TotalWrapper;
