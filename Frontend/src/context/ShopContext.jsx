/* eslint-disable react/prop-types */
import { createContext } from "react";
// import { products } from "../assets/assets.js"; // now we are gonna get the data from the backend
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'




export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate()

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const sizes in cartItems[items]) {

        try {
          if (cartItems[items][sizes] > 0) {
            totalCount += cartItems[items][sizes];
          }
        }
        catch (error) {
          toast.error(error.message);
        }

      }
    }
    return totalCount;
  }
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    console.log(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      }
      else {
        cartData[itemId][size] = 1;
      }
    }

    else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
      } catch (error) {

        console.log('yes here at addToCart', error);
        toast.error(error.message);
      }
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }



  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }

    return totalAmount;
  }

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      // console.log(backendUrl + '/api/product/list');
      // console.log(response.data);
      // console.log(response.status);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
      else {
        console.log('From the getProuduct Data else statement');
        toast.error(response.data.message);
      }
    }

    catch (error) {
      console.log(error);
      console.log('From the getProuduct Data catch statement');
      toast.error(error.message);
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.status === 200) {
        setCartItems(response.data.cartData);
      }
    }

    catch (error) {
      console.log(error);
      toast.error(error.message);

    }
  }
  useEffect(() => {
    getProductsData()
  }, []);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken); // Fetch user cart data if token exists
    }
  }, []);

  // useEffect(() => {
  //   if (!token && localStorage.getItem('token')) {
  //     setToken(localStorage.getItem('token'));
  //     getUserCart(localStorage.getItem('token'));
  //   }
  // }, [])

  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems,
    getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setToken, token, setCartItems
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;