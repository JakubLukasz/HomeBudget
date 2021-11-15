import React, { useState, useEffect } from 'react';
import { styled } from '@mui/styles';

import { Grid } from '@mui/material';

import PageHeader from '@Components/atoms/PageHeader';
import Card from '@Components/atoms/Card';
import NoData from '@Components/molecules/NoData';
import Expense from '@Components/molecules/Expense';

import { useFirestore } from '@Hooks/useFirestore';

const Container = styled('div')({
  backgroundColor: '#F0F5F7',
  flex: 1,
  overflow: 'auto',
});

const Content = styled('div')({
  padding: '10px',
})

const GridCard = styled(Card)({
  margin: '0.5rem',
  height: 'calc(100% - 1rem)'
})

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const { removeFromCollection, getCollectionData } = useFirestore();

  useEffect(() => {
    getCollectionData('expenses').then(resp => setExpenses(resp));
  }, [expenses])

  return (
    <Container>
      {expenses && (<><PageHeader title="Fixed Expenses" />
        <Content>
          {expenses.length === 0 && (
            <NoData text="Currently You have no expenses" icon="Expense" />
          )}
          <Grid container>
            {expenses.map((expenseVal) => (
              <Grid item key={expenseVal.id} xs={12} sm={6} md={4} lg={3}>
                <GridCard>
                  <Expense {...expenseVal} handleRemove={() => removeFromCollection('expenses', expenseVal.id)} />
                </GridCard>
              </Grid>
            ))}
          </Grid>
        </Content></>)}
    </Container>
  );
};

export default Expenses;
