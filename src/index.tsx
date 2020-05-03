import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import GlobalStyle from './components/GlobalStyles'
import MainView from './views/MainView'
import EditorView from './views/EditorView'

ReactDOM.render(
  <>
    <GlobalStyle />
    <EditorView />
  </>,
  document.getElementById('root')
)
