import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import GlobalStyle from './components/GlobalStyles'
import Router from './views/router'

ReactDOM.render(
  <>
    <GlobalStyle />
    <Router />
  </>,
  document.getElementById('root')
)
