import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProviderWrapper} from './context/auth.context.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
);

