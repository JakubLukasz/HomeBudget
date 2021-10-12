import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';
import AddBill from './AddBill';
import AddExpense from './AddExpense';

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin: 5px 0;
  margin: 0 auto;
  color: ${({ moneyLeft }) => (moneyLeft < 0 ? 'red' : 'black')};

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

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.color.secondary};
  margin: 15px 0 5px;
`;

const Controls = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0px;
  max-width: 300px;
`;

const TotalWrapper = ({ moneyLeft, currency }) => {
  return (
    <Container>
      <Title>Money left</Title>
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
