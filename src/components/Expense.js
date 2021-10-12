import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from '../hooks/useFirestore';
import CloseButton from './CloseButton';

const Container = styled.div`
  width: 49%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 15px;
  margin: 0 2% 2% 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;

  &:nth-child(2n) {
    margin: 0 0 2% 0;
  }

  @media ${devices.tablet} {
    width: 32%;
    margin: 0 2% 2% 0;
    padding: 25px;

    &:nth-child(2n) {
      margin: 0 2% 2% 0;
    }

    &:nth-child(3n) {
      margin: 0 0 2% 0;
    }
  }

  @media ${devices.laptop} {
    width: 19%;
    margin: 0 1.25% 1.25% 0;

    &:nth-child(2n) {
      margin: 0 1.25% 1.25% 0;
    }

    &:nth-child(3n) {
      margin: 0 1.25% 1.25% 0;
    }

    &:nth-child(5n) {
      margin: 0 0 1.25% 0;
    }
  }
`;

const Close = styled(CloseButton)`
  width: 15px;
  height: 15px;
`;

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
`;

const Price = styled.p`
  color: ${({ isSpent }) => (isSpent ? 'red' : 'green')};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  text-align: center;
`;

const Day = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 5px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  @media ${devices.laptop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Expense = ({ id, amount, title, isSpent, currency, dayOfCollection }) => {
  const { removeExpense } = useFirestore();
  const handleDeleteExpense = () => removeExpense(id);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Close click={handleDeleteExpense} />
      </Header>
      <Main>
        <Day>Collection: {dayOfCollection}</Day>
        <Price isSpent={isSpent}>
          <span>
            {isSpent ? '-' : '+'}
            {amount}
          </span>{' '}
          {currency}
        </Price>
      </Main>
    </Container>
  );
};

Expense.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string,
  isSpent: PropTypes.bool,
  currency: PropTypes.string,
  dayOfCollection: PropTypes.number,
  id: PropTypes.string,
};

export default Expense;
