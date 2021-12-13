import React from 'react'
import { styled } from '@mui/styles'

import ExpenseIcon from '@mui/icons-material/Assignment'

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

const StyledExpenseIcon = styled(ExpenseIcon)({
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

const NoExpenses: React.FC<IProps> = ({ text }) => {
  return (
    <Container>
      <IconBox>
        <StyledExpenseIcon />
      </IconBox>
      <Info variant="p1">{text}</Info>
    </Container>
  )
}

export default NoExpenses
