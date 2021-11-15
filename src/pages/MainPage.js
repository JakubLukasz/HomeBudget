import React, { useEffect, useState } from 'react';
import { styled } from '@mui/styles';

import { Stack } from '@mui/material';

import Card from '@Components/atoms/Card';
import Text from '@Components/atoms/Text';
import PageHeader from '@Components/atoms/PageHeader';
import RoundButton from '@Components/molecules/RoundButton';
import NoData from '@Components/molecules/NoData';
import Transaction from '@Components/molecules/Transaction';

import { useFirestore } from '@Hooks/useFirestore';
import { useUi } from '@Hooks/useUi';

const Container = styled('div')({
  backgroundColor: '#F0F5F7',
  flex: 1,
  overflow: 'auto',
});

const Content = styled('div')({
  padding: '15px 10px',

  '@media screen and (min-width: 375px)': {
    padding: '15 20px'
  },
})

const MoneyDisplay = styled('p')((props) => ({
  fontWeight: 600,
  fontSize: '1.8rem',
  textAlign: 'center',
  color: props.moneyleft < 0 ? '#f44c4c' : '#000000',

  '@media screen and (min-width:768px)': {
    padding: '0 10px',
  }
}))

const TotalTitle = styled(Text)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
}))

const CardsContainer = styled("div")({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '10px',

  '@media screen and (min-width:768px)': {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '31.5vh 31.5vh 31.5vh',
  },

  '@media screen and (min-width: 1024px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  }
})

const TotalCard = styled(Card)({
  '@media screen and (min-width:768px)': {
    gridColumn: '1/2',
    gridRow: '1'
  },

  '@media screen and (min-width:1024px)': {

  }
})

const TransactionCard = styled(Card)({
  overflowY: 'scroll',
  '@media screen and (min-width:768px)': {
    gridColumn: '2/3',
    gridRow: '1/4'
  },

  '@media screen and (min-width:1024px)': {
    gridColumn: '2/4',
    gridRow: '1/4'
  }
})

const TransactionContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px 50px',
})

const ActionButtons = styled("div")({
  marginTop: '40px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
})


const MainPage = () => {
  const [data, setData] = useState(null);

  const {
    getUserData,
    getCollectionData,
    checkPayday,
    checkExpense,
  } = useFirestore();

  const {
    setIsBillModalOpen,
    setIsExpensesModalOpen,
    setIsEarningsModalOpen
  } = useUi();

  useEffect(() => {
    const init = async () => {
      const transactions = await getCollectionData('transactions');
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      const userData = await getUserData();
      setData({ ...userData, transactions })
    }
    init();
  }, []);

  useEffect(() => {
    checkPayday();
    getCollectionData('expense').then((resp) =>
      resp.forEach((expense) => checkExpense(expense))
    );
  }, []);

  return (
    <Container>
      {data && (<>
        <PageHeader title="Dashboard" />
        <Content>
          <CardsContainer>
            <TotalCard title="TOTAL">
              <Stack alignItems="center">
                <TotalTitle variant="p1">
                  Money left
                </TotalTitle>
                <MoneyDisplay moneyleft={data.moneyLeft}>
                  {data.moneyLeft} {data.currency}
                </MoneyDisplay>
              </Stack>
              <ActionButtons>
                <RoundButton onClick={() => setIsBillModalOpen(true)} text="Add Bill" icon="Add" />
                <RoundButton onClick={() => setIsEarningsModalOpen(true)} text="Update Earnings" icon="Update" />
                <RoundButton onClick={() => setIsExpensesModalOpen(true)} text="Add Expense" icon="Expense" />
              </ActionButtons>
            </TotalCard>
            <TransactionCard title="TRANSACTIONS">
              <TransactionContainer>
                {(data.transactions.length != 0) ? data.transactions.map((transactionData) => (
                  <Transaction {...transactionData} key={transactionData.id} />
                )) : <NoData text="Currently You have no transactions" icon="Transaction" />}
              </TransactionContainer>
            </TransactionCard>
          </CardsContainer>
        </Content></>)}

    </Container>
  );
}

export default React.memo(MainPage);
