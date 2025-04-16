import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SellerContext from './Context/sellerContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SellerContext>
      <App />
    </SellerContext>
  </BrowserRouter>,
)
