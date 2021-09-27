import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { useFirestore } from '../hooks/useFirestore';
import CloseIcon from '../assets/images/closeIcon.svg';

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  border-radius: 15px;

  @media ${devices.tablet} {
    padding: 25px;
  }
`;

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-transform: uppercase;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
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

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.color.primary};
  height: 1.3rem;
  width: auto;
`;

const DeleteButton = styled.button`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
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
        <DeleteButton onClick={handleDeleteExpense}>
          <StyledIcon src={CloseIcon} />
        </DeleteButton>
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
