import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import { Stack } from '@mui/material';

import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const IconBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.light,
  padding: '12px',
}));

const Price = styled('p')((props) => ({
  color: `${props.isspent ? '#f44c4c' : '#21bf39'}`,
  fontWeight: 500,
  fontSize: '0.8rem',
}))

const Title = styled(Text)({
  fontWeight: 600,
})

const Transaction = (props) => {

  const {
    title,
    amount,
    date,
    currency,
    categoryGroup,
    isSpent,
  } = props;

  return (
    <Container>
      <Stack direction="row">
        <IconBox>
          <Icon type={categoryGroup} color="primary" />
        </IconBox>
        <div>
          <Title variant="p1">
            {title}
          </Title>
          <Text variant="p2">{date}</Text>
        </div>
      </Stack>
      <Stack>
        <Price variant="p2" isspent={isSpent}>
          <span>
            {isSpent ? '-' : '+'}
            {amount}
          </span>{' '}
          {currency}
        </Price>
      </Stack>
    </Container>
  )
}

Transaction.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  currency: PropTypes.string,
  categoryGroup: PropTypes.string,
  isSpent: PropTypes.bool,
};

export default Transaction;
