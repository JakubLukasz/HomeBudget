import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const Card = ({ className, children, title }) => {
  return (
    <Container className={className}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Card;
