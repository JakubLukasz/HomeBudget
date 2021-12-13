import React from 'react'
import { styled } from '@mui/styles'

import { Stack } from '@mui/material'

import Text from '@Components/atoms/Text'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
})

const IconBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.light,
  padding: '12px',
}))

const Price = styled('p')((props: { isspent: boolean }) => ({
  color: `${props.isspent ? '#f44c4c' : '#21bf39'}`,
  fontWeight: 500,
  fontSize: '0.8rem',
}))

const Title = styled(Text)({
  fontWeight: 600,
})

interface IProps {
  Icon: any
  title: string
  amount: number
  date: string
  currency: string
  categoryGroup: string
  isSpent: boolean
}

const Transaction: React.FC<IProps> = ({
  title,
  amount,
  date,
  currency,
  Icon,
  isSpent,
}) => {
  return (
    <Container>
      <Stack direction="row">
        <IconBox>
          <Icon />
        </IconBox>
        <div>
          <Title variant="p1">{title}</Title>
          <Text variant="p2">{date}</Text>
        </div>
      </Stack>
      <Stack>
        <Price isspent={isSpent}>
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

export default Transaction
