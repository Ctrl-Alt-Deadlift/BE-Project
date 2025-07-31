import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BuyerContextProvider from './context/BuyerContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BuyerContextProvider>
      <App />
    </BuyerContextProvider>
  </React.StrictMode>,
)
