import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const Card = ({ className, children, title }) => {
  return (
    <div className={className}>
      <Title>{title}</Title>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Card;
