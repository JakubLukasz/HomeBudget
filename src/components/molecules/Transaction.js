import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Stack } from '@mui/material';
import { useInputData } from '../../hooks/useInputData';
import { styled as restyled } from '@mui/styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  padding: 0px 5px;

  &:last-child {
    margin: 20px 0 10px;
  }

  @media ${devices.mobileM} {
    padding: 0px 10px;
  }

  @media ${devices.laptop} {
    padding: 0px 10px;
    margin: 15px 0;
  }
`;

const IconBox = restyled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.light,
  padding: '10px',
}));

const Price = styled.span`
  color: ${({ isSpent }) => (isSpent ? '#f44c4c' : '#21bf39')};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Transaction = ({
  title,
  amount,
  date,
  currency,
  categoryGroup,
  isSpent,
}) => {
  const { getCategoryIcon } = useInputData();
  const Icon = getCategoryIcon(categoryGroup);

  return (
    <Container>
      <Stack direction="row">
        <IconBox>
          <Icon color="primary" />
        </IconBox>
        <div>
          <Typography variant="h6" component="p">
            {title}
          </Typography>
          <Typography variant="body2">{date}</Typography>
        </div>
      </Stack>
      <Stack>
        <Price isSpent={isSpent}>
          <span>
            {isSpent ? '-' : '+'}
            {amount}
          </span>{' '}
          {currency}
        </Price>
      </Stack>
    </Container>
  );
};

Transaction.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  currency: PropTypes.string,
  categoryGroup: PropTypes.string,
  isSpent: PropTypes.bool,
};

export default Transaction;
