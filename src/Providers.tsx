import React from 'react'
import GlobalStyle from '@Assets/styles/GlobalStyle'
import { theme } from '@Assets/styles/theme'

import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/styled-engine'

import { AuthContextProvider } from '@Contexts/AuthContext'
import { FirestoreContextProvider } from '@Contexts/FirestoreContext'
import { UiContextProvider } from '@Contexts/UiContext'

interface Props {
  children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <UiContextProvider>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <GlobalStyle />
              {children}
            </MuiThemeProvider>
          </StyledEngineProvider>
        </UiContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  )
}

export default Providers
