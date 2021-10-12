import { createGlobalStyle } from 'styled-components';
import MontserratExtraBold from '../fonts/Montserrat-ExtraBold.ttf';
import MontserratBold from '../fonts/Montserrat-Bold.ttf';
import MontserratSemiBold from '../fonts/Montserrat-SemiBold.ttf';
import MontserratMedium from '../fonts/Montserrat-Medium.ttf';
import MontserratRegular from '../fonts/Montserrat-Regular.ttf';
import MontserratLight from '../fonts/Montserrat-Light.ttf';
import { devices } from './devices';

const GlobalStyle = createGlobalStyle`
    *,*::before,*::after{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin:0;
        padding:0;
    }

    body, input, textarea, button,select{
        font-family: ${({ theme }) => theme.font.family.montserrat};
    }

    button{
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    a{
        -webkit-tap-highlight-color: transparent;
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 800;
        src: url(${MontserratExtraBold}) format('truetype');
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 700;
        src: url(${MontserratBold}) format('truetype');
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 600;
        src: url(${MontserratSemiBold}) format('truetype');
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 500;
        src: url(${MontserratMedium}) format('truetype');
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 400;
        src: url(${MontserratRegular}) format('truetype');
    }

    @font-face{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 300;
        src: url(${MontserratLight}) format('truetype');
    }

    html{
        font-size:62.5%;
        overflow: hidden;

        @media ${devices.tablet}{
            font-size:75%;
        }

        @media ${devices.laptop}{
            font-size:45%;
        }

        @media ${devices.laptopL}{
            font-size:55%;
        }
    }

    
`;

export default GlobalStyle;
