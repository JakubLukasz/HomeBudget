import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TransactionsIcon from '../assets/images/transactionsIcon.svg';
import Icon from './Icon';
import { devices } from '../assets/styles/devices';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;

  @media ${devices.laptop} {
    margin: 100px 0;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-align: center;
  margin-top: 30px;

  @media ${devices.laptop} {
    font-size: 2rem;
  }
`;

const StyledIcon = styled(Icon)`
  width: 10rem;
  height: 10rem;

  @media ${devices.laptop} {
    width: 15rem;
    height: 15rem;
  }
`;

const NoTransactions = ({ text }) => {
  return (
    <Container>
      <StyledIcon src={TransactionsIcon}></StyledIcon>
      <Message>{text}</Message>
    </Container>
  );
};

NoTransactions.propTypes = {
  text: PropTypes.string,
};

export default NoTransactions;
