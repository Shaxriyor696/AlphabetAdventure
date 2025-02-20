import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Route, Router } from 'wouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router base="/AlphabetAdventure">
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>
)
