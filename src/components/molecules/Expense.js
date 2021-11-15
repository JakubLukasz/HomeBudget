import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import { Stack, Grid, IconButton } from '@mui/material';

import Icon from '@Components/atoms/Icon';
import Text from '@Components/atoms/Text';

const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
})

const Title = styled(Text)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontWeight: 600,
})

const Price = styled(Text)((props) => ({
  fontWeight: 500,
  color: props.isspent ? '#f44c4c' : '#21bf39',
  textAlign: 'center',
  margin: '20px 0 0',
}))

const MonthsTitle = styled(Text)({
  fontWeight: 600,
  marginBottom: '10px'
})

const Expense = ({ handleRemove, dayOfCollection, currency, isSpent, title, amount, months }) => (
  <Container>
    <Stack spacing={1}>
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <div>
            <Title variant="h4">{title}</Title>
            <Text variant="h6" >
              Day: {dayOfCollection}
            </Text>
          </div>
          <IconButton variant="contained" onClick={handleRemove}>
            <Icon type="Delete" color="primary" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <MonthsTitle variant="h6" component="p">
          Months ( {months.length}/12 )
        </MonthsTitle>
        <Grid container>
          {months.map(({ name, number }) => (
            <Grid item xs={6} key={number}>
              <Text variant="p1">{name}</Text>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
    <Price variant="h4" component="p" isspent={isSpent}>
      <span>
        {isSpent ? '-' : '+'}
        {amount}
      </span>{' '}
      {currency}
    </Price>
  </Container>
);

Expense.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string,
  isSpent: PropTypes.bool,
  currency: PropTypes.string,
  dayOfCollection: PropTypes.number,
  months: PropTypes.array,
  handleRemove: PropTypes.func,
};

export default Expense;
