import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import GlobalStyle from '../assets/styles/GlobalStyle';
import { AuthContextProvider } from '../contexts/AuthContext';
import { FirestoreContextProvider } from '../contexts/FirestoreContext';
import { InputDataContextProvider } from '../contexts/InputDataContext';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { muiTheme } from '../assets/styles/muiTheme';
import { GraphContextProvider } from '../contexts/GraphContext';
import { UiContextProvider } from '../contexts/UiContext';

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
