import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from '@Hooks/useFirestore';
import { useInputData } from '@Hooks/useInputData';
import { Stack, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
`;

const Title = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: '600';
`;

const Price = styled.p`
  font-weight: 500;
  color: ${({ isSpent }) => (isSpent ? '#f44c4c' : '#21bf39')};
  font-size: 1.5rem;
  text-align: center;
  margin: 20px 0 0;
`;

const Expense = ({
  id,
  amount,
  title,
  isSpent,
  currency,
  dayOfCollection,
  months,
}) => {
  const [monthNames, setMonthNames] = useState([]);
  const { getMonthNames } = useInputData();
  const { removeExpense } = useFirestore();

  useEffect(() => {
    setMonthNames(getMonthNames(months));
  }, []);

  return (
    <Container>
      <Stack spacing={1}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Title variant="h5">Title: {title}</Title>
            <IconButton variant="contained" onClick={() => removeExpense(id)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </Stack>
          <Typography variant="h6">
            Collection Day: {dayOfCollection}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Months
          </Typography>
          <Grid container>
            {monthNames.map((monthName) => (
              <Grid item xs={6} key={monthName}>
                <Typography>{monthName}</Typography>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
      <Price variant="h6" isSpent={isSpent}>
        <span>
          {isSpent ? '-' : '+'}
          {amount}
        </span>{' '}
        {currency}
      </Price>
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
  months: PropTypes.array,
};

export default Expense;
