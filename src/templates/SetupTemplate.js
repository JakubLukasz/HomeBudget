import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import GlobalStyle from '../assets/styles/GlobalStyle';
import { AuthContextProvider } from '../contexts/AuthContext';
import { FirestoreContextProvider } from '../contexts/FirestoreContext';
import { InputDataContextProvider } from '../contexts/InputDataContext';
import { LoadingContextProvider } from '../contexts/LoadingContext';
import PropTypes from 'prop-types';

const SetupTemplate = ({ children }) => {
  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <FirestoreContextProvider>
          <InputDataContextProvider>
            <GlobalStyle theme={theme} />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </InputDataContextProvider>
        </FirestoreContextProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
};

SetupTemplate.propTypes = {
  children: PropTypes.node,
};

export default SetupTemplate;
