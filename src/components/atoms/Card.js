import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px;
`;

const Card = ({ className, children, title }) => {
  return (
    <Container className={className}>
      {title && (
        <Typography color="secondary" variant="subtitle2" component="p">
          {title}
        </Typography>
      )}
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
