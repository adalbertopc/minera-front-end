import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 16px Poppins;
    min-height: 100vh;
  }
`

export default GlobalStyle