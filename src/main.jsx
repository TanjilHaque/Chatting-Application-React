import database from '../Database/Firebase.config.js'
import { ToastContainer } from 'react-toastify';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>,
)
