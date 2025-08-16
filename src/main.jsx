import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Context/CartContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>   
      </CartProvider> 
    </DataProvider>
  </StrictMode>,
)
