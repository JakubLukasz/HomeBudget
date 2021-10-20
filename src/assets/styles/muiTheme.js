import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#011627',
    },
    secondary: {
      main: '#A0A0A0',
      light: '#EFEFEF',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    button: {
      fontWeight: '600',
    },
    h6: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: '700',
    },
    subtitle2: {
      fontWeight: '600',
      fontSize: '0.7rem',
    },
  },
});
