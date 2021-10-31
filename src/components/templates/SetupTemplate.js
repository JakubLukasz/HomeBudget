import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@Assets/styles/theme';
import GlobalStyle from '@Assets/styles/GlobalStyle';
import { AuthContextProvider } from '@Contexts/AuthContext';
import { FirestoreContextProvider } from '@Contexts/FirestoreContext';
import { InputDataContextProvider } from '@Contexts/InputDataContext';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { muiTheme } from '@Assets/styles/muiTheme';
import { GraphContextProvider } from '@Contexts/GraphContext';
import { UiContextProvider } from '@Contexts/UiContext';

const SetupTemplate = ({ children }) => {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <GraphContextProvider>
          <InputDataContextProvider>
            <UiContextProvider>
              <StyledEngineProvider injectFirst>
                <MuiThemeProvider theme={muiTheme}>
                  <GlobalStyle theme={theme} />
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </MuiThemeProvider>
              </StyledEngineProvider>
            </UiContextProvider>
          </InputDataContextProvider>
        </GraphContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
};

SetupTemplate.propTypes = {
  children: PropTypes.node,
};

export default SetupTemplate;
