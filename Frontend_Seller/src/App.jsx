import React from 'react'
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Requests from './pages/Requests.jsx'
import MoreInfo from './pages/MoreInfo.jsx';
import ProductDetails from './pages/ProductDetails.jsx'
import EditProduct from './pages/EditProduct.jsx'
import EditProductPage from './pages/EditProductPage.jsx';



const App = () => {
  return (

    <div className='bg-gray-200 min-h-screen'>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />


      </Routes>


    </div>
  )
}

export default App