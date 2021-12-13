import React, { useEffect, useState } from 'react'
import { styled } from '@mui/styles'

import { Stack } from '@mui/material'

import Card from '@Components/atoms/Card'
import Text from '@Components/atoms/Text'
import PageHeader from '@Components/atoms/PageHeader'
import RoundButton from '@Components/atoms/RoundButton'
import NoTransactions from '@Components/molecules/NoTransactions'
import Transaction from '@Components/molecules/Transaction'

import AddIcon from '@mui/icons-material/Add'
import UpdateIcon from '@mui/icons-material/Cached'
import ExpenseIcon from '@mui/icons-material/Assignment'

import { useFirestore } from '@Hooks/useFirestore'
import { useUi } from '@Hooks/useUi'

import { getIconByName } from '@/helpers/getIconByName'

import { IExpense, ITransaction } from '@/types'

const Container = styled('div')({
  backgroundColor: '#F0F5F7',
  flex: 1,
  overflow: 'auto',
})

const Content = styled('div')({
  padding: '15px 10px',

  '@media screen and (min-width: 375px)': {
    padding: '15 20px',
  },
})

const MoneyDisplay = styled('p')((props: { moneyleft: number }) => ({
  fontWeight: 600,
  fontSize: '1.8rem',
  textAlign: 'center',
  color: props.moneyleft < 0 ? '#f44c4c' : '#000000',

  '@media screen and (min-width:768px)': {
    padding: '0 10px',
  },
}))

const TotalTitle = styled(Text)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 600,
}))

const CardsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',

  '@media screen and (min-width:768px)': {
    flexDirection: 'row',
  },
})

const SCard = styled(Card)({
  marginBottom: '15px',

  '&:last-child': {
    margin: 0,
  },

  '@media screen and (min-width:768px)': {
    marginBottom: '0px',
    marginRight: '15px',
  },
})

const TotalCard = styled(SCard)({
  flex: 1,

  '@media screen and (min-width:768px)': {
    alignSelf: 'flex-start',
  },
})

const TransactionCard = styled(SCard)({
  flex: 2,
})

const TransactionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const ActionButtons = styled('div')({
  margin: '40px auto 0',
  display: 'flex',

  '@media screen and (min-width:768px)': {
    width: '400px',
  },
})

const SRoundButton = styled(RoundButton)({
  width: '33%',
})

const MainPage: React.FC = () => {
  const [data, setData] = useState<any>(null)

  const {
    getUserData,
    getTransactionsData,
    getExpensesData,
    checkPayday,
    checkExpense,
  } = useFirestore()

  const { setIsBillModalOpen, setIsExpensesModalOpen, setIsEarningsModalOpen } =
    useUi()

  useEffect(() => {
    const init = async () => {
      const transactions = await getTransactionsData()
      transactions.sort(
        (a: ITransaction, b: ITransaction) =>
          +new Date(b.date) - +new Date(a.date)
      )
      const userData = await getUserData()
      setData({ ...userData, transactions })
    }
    init()
  }, [])

  useEffect(() => {
    checkPayday()
    getExpensesData().then((resp: IExpense[]) =>
      resp.forEach((expense) => checkExpense(expense))
    )
  }, [])

  return (
    <Container>
      {data && (
        <>
          <PageHeader title="Dashboard" />
          <Content>
            <CardsContainer>
              <TotalCard title="TOTAL">
                <Stack alignItems="center">
                  <TotalTitle variant="p1">Money left</TotalTitle>
                  <MoneyDisplay moneyleft={data.moneyLeft}>
                    {data.moneyLeft} {data.currency}
                  </MoneyDisplay>
                </Stack>
                <ActionButtons>
                  <SRoundButton
                    onClick={() => setIsBillModalOpen(true)}
                    text="Add Bill"
                    Icon={AddIcon}
                  />
                  <SRoundButton
                    onClick={() => setIsEarningsModalOpen(true)}
                    text="Update Earnings"
                    Icon={UpdateIcon}
                  />
                  <SRoundButton
                    onClick={() => setIsExpensesModalOpen(true)}
                    text="Add Expense"
                    Icon={ExpenseIcon}
                  />
                </ActionButtons>
              </TotalCard>
              <TransactionCard title="TRANSACTIONS">
                <TransactionContainer>
                  {data.transactions.length !== 0 ? (
                    data.transactions.map((transactionData) => (
                      <Transaction
                        {...transactionData}
                        key={transactionData.id}
                        Icon={getIconByName(transactionData.category)}
                      />
                    ))
                  ) : (
                    <NoTransactions text="Currently You have no transactions" />
                  )}
                </TransactionContainer>
              </TransactionCard>
            </CardsContainer>
          </Content>
        </>
      )}
    </Container>
  )
}

export default MainPage
