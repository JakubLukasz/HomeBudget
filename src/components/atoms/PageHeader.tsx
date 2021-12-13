import React from 'react'
import { styled } from '@mui/styles'

import Text from '@Components/atoms/Text'

const Header = styled('header')({
  width: '100%',
  backgroundColor: '#ffffff',
  padding: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 50px',

  '@media screen and (min-width: 1024px)': {
    display: 'none',
  },
})

const PageTitle = styled(Text)({
  fontWeight: 700,
})

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Header>
      <PageTitle variant="h6">{title}</PageTitle>
    </Header>
  )
}

export default PageHeader
