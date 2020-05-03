import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    height: 500px;
    width: 700px;
    font-family: Roboto, sans-serif;
  }


  .sidebar-content {
    display: flex;
    flex-direction: column;
    margin-top: 4em;
  }
`
