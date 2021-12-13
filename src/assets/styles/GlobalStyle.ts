import { createGlobalStyle } from 'styled-components'
import MontserratExtraBold from '@Assets/fonts/Montserrat-ExtraBold.ttf'
import MontserratBold from '@Assets/fonts/Montserrat-Bold.ttf'
import MontserratSemiBold from '@Assets/fonts/Montserrat-SemiBold.ttf'
import MontserratMedium from '@Assets/fonts/Montserrat-Medium.ttf'
import MontserratRegular from '@Assets/fonts/Montserrat-Regular.ttf'
import MontserratLight from '@Assets/fonts/Montserrat-Light.ttf'

const GlobalStyle = createGlobalStyle`

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

    *,*::before,*::after{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin:0;
        padding:0;
    }

    body, input, textarea, button,select{
        font-family: 'Montserrat';
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

    html{
        overflow: hidden;
    }

    
`

export default GlobalStyle
