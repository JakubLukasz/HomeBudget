import { createTheme } from '@mui/material';


// MEDIA QUERIES
// mobileS 
// '@media screen and (min-width: 320px)'
// mobileM
// '@media screen and (min-width: 375px)'
// mobileL
// '@media screen and (min-width: 425px)'
// tablet
// '@media screen and (min-width: 768px)'
// laptop
// '@media screen and (min-width: 1024px)'
// laptopL
// '@media screen and (min-width: 1440px)'
// desktop
// '@media screen and (min-width: 2560px)'


export const theme = createTheme({
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
    h1: {
      fontSize: '2.8rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
    h4: {
      fontSize: '1.4rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.8rem',
    },
    subtitle2: {
      fontSize: '0.6rem',
    },
  },
});
