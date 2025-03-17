import React from 'react'
import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Requests from './pages/Requests.jsx'
import Navbar from './components/Navbar.jsx';
import MoreInfo from './pages/MoreInfo.jsx';


const App = () => {
  return (

    <div className='bg-black'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
      </Routes>


    </div>
  )
}

export default App