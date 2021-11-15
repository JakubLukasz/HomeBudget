import React from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from '@Assets/styles/GlobalStyle';
import { theme } from '@Assets/styles/theme';

import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';

import { AuthContextProvider } from '@Contexts/AuthContext';
import { FirestoreContextProvider } from '@Contexts/FirestoreContext';
import { UiContextProvider } from '@Contexts/UiContext';

const Providers = ({ children }) => {
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
    );
};

Providers.propTypes = {
    children: PropTypes.node,
};

export default Providers;
