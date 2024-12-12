/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/assets.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
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
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  }

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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


  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems,
    getCartCount, updateQuantity, getCartAmount, navigate
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;