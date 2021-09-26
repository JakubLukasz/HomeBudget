import styled from 'styled-components';
import Icon from '../components/Icon';
import { devices } from '../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  padding: 0px 5px;

  @media ${devices.mobileM} {
    padding: 0px 10px;
  }

  @media ${devices.laptop} {
    padding: 0px 10px;
    margin: 15px 0;
  }
`;

const Category = styled(Icon)`
  height: 20px;
  width: auto;

  @media ${devices.latpop} {
    height: 15px;
  }
`;

const CategoryContainer = styled.div`
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  padding: 10px;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100px;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-transform: capitalize;
  @media ${devices.mobileM} {
    max-width: 200px;
  }

  @media ${devices.laptop} {
    max-width: 500px;
  }
`;

const Date = styled.span`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.font.weight.regular};
`;

const Price = styled.span`
  color: ${({ isSpent }) => (isSpent ? 'red' : 'green')};
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Transaction = ({
  title,
  amount,
  date,
  currency,
  categorySrc,
  isSpent,
}) => {
  return (
    <Container>
      <MainHeader>
        <CategoryContainer>
          <Category src={categorySrc} />
        </CategoryContainer>
        <header>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </header>
      </MainHeader>
      <div>
        <Price isSpent={isSpent}>
          <span>
            {isSpent ? '-' : '+'}
            {amount}
          </span>{' '}
          {currency}
        </Price>
      </div>
    </Container>
  );
};

Transaction.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  currency: PropTypes.string,
  categorySrc: PropTypes.string,
  isSpent: PropTypes.bool,
};

export default Transaction;
