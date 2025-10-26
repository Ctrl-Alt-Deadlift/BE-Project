/* eslint-disable no-unused-vars */
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom"
import Verify from "./pages/Verify.jsx"
import Home from "./pages/Home.jsx"
import Collection from "./pages/Collection.jsx"
import Contact from "./pages/Contact.jsx"
import Product from "./pages/Product.jsx"
import About from "./pages/About.jsx"
import Cart from "./pages/Cart.jsx"
import Cart_r from "./pages/Cart_r.jsx"
import Orders from './pages/Orders.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx"
import SearchBar from "./components/SearchBar.jsx"
import LoginRegisterPage from "./pages/Login_Register_Page.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefrshHandler from "./refreshHandler.js"

const App = () => {
  return (

    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <RefrshHandler />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart_r" element={<Cart_r />} />
        {/* Wrap the login/register page with GoogleOAuthProvider so Google login works like before */}
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <LoginRegisterPage />
            </GoogleOAuthProvider>
          }
        />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
