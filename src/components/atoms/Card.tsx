import React from 'react'
import { styled } from '@mui/styles'
import Text from '@Components/atoms/Text'

const Container = styled('div')({
  backgroundColor: '#ffffff',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px;',
  borderRadius: '15px',
  padding: '10px',
})

const Content = styled('div')({
  padding: '15px 10px',
})

const Title = styled(Text)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.secondary.main,
}))

interface Props {
  className?: string
  children: React.ReactNode
  title?: string
}

const Card: React.FC<Props> = ({ className, children, title }) => {
  return (
    <Container className={className}>
      {title && <Title variant="p2">{title}</Title>}
      <Content>{children}</Content>
    </Container>
  )
}

export default Card
