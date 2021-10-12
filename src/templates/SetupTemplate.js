import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import GlobalStyle from '../assets/styles/GlobalStyle';
import { AuthContextProvider } from '../contexts/AuthContext';
import { FirestoreContextProvider } from '../contexts/FirestoreContext';
import { InputDataContextProvider } from '../contexts/InputDataContext';
import PropTypes from 'prop-types';

const SetupTemplate = ({ children }) => {
  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <InputDataContextProvider>
          <GlobalStyle theme={theme} />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </InputDataContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
};

SetupTemplate.propTypes = {
  children: PropTypes.node,
};

export default SetupTemplate;
