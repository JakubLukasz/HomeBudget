import React from 'react'
import { styled } from '@mui/styles'

import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'

import Text from '@Components/atoms/Text'

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px 0',
  padding: '0 20px',
  textAlign: 'center',

  '@media screen and (min-width:1024px)': {
    margin: '100px 0',
  },
})

const IconBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '1rem',
  borderRadius: '10px',
  marginBottom: '2rem',
}))

const StyledTransactionIcon = styled(TransactionIcon)({
  fontSize: '6.25rem',

  '@media screen and (min-width:1024px)': {
    fontSize: '9rem',
  },
})

const Info = styled(Text)({
  fontWeight: 600,
})

interface IProps {
  text: string
}

const NoTransactions: React.FC<IProps> = ({ text }) => {
  return (
    <Container>
      <IconBox>
        <StyledTransactionIcon />
      </IconBox>
      <Info variant="p1">{text}</Info>
    </Container>
  )
}

export default NoTransactions
