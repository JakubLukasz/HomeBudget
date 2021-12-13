import React from 'react'
import { styled } from '@mui/styles'

import AppNav from '@Components/organisms/AppNav'

const Container = styled('div')({
  maxWidth: '100vw',
  height: 'var(--app-height)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column-reverse',

  '@media screen and (min-width:1024px)': {
    flexDirection: 'row',
  },
})

const AppTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <AppNav />
      {children}
    </Container>
  )
}

export default AppTemplate
