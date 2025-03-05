/* eslint-disable react/prop-types */


// Fullstack code: commenting as initially now working on the frontend.


// import { createContext } from "react";
// // import { products } from "../assets/assets.js"; // now we are gonna get the data from the backend
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'



// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {

//   const currency = '$';
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [token, setToken] = useState('');
//   const navigate = useNavigate()

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const sizes in cartItems[items]) {

//         try {
//           if (cartItems[items][sizes] > 0) {
//             totalCount += cartItems[items][sizes];
//           }
//         }
//         catch (error) {
//           toast.error(error.message);
//         }

//       }
//     }
//     return totalCount;
//   }
//   const addToCart = async (itemId, size) => {
//     let cartData = structuredClone(cartItems);
//     console.log(cartItems);
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size]++;
//       }
//       else {
//         cartData[itemId][size] = 1;
//       }
//     }

//     else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
//       } catch (error) {

//         console.log('yes here at addToCart', error);
//         toast.error(error.message);
//       }
//     }
//   }

//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//     if (token) {
//       try {
//         await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   }



//   const getCartAmount = () => {
//     let totalAmount = 0;

//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       console.log('Item information:', itemInfo);
//       for (const size in cartItems[items]) {
//         if (cartItems[items][size] > 0 && itemInfo) {
//           totalAmount += itemInfo.price * cartItems[items][size];
//         }
//       }
//     }
//     console.log('Total amount:', totalAmount);
//     return totalAmount;
//   }

//   const getProductsData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       // console.log(backendUrl + '/api/product/list');
//       // console.log(response.data);
//       // console.log(response.status);
//       if (response.status === 200) {
//         setProducts(response.data.products);
//       }
//       else {
//         console.log('From the getProuduct Data else statement');
//         toast.error(response.data.message);
//       }
//     }

//     catch (error) {
//       console.log(error);
//       console.log('From the getProuduct Data catch statement');
//       toast.error(error.message);
//     }
//   }

//   const getUserCart = async (token) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
//       if (response.status === 200) {
//         setCartItems(response.data.cartData);
//       }
//     }

//     catch (error) {
//       console.log(error);
//       toast.error(error.message);

//     }
//   }
//   useEffect(() => {
//     getProductsData()
//   }, []);


//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (!token && storedToken) {
//       setToken(storedToken);
//       getUserCart(storedToken); // Fetch user cart data if token exists
//     }
//   }, []);

//   // useEffect(() => {
//   //   if (!token && localStorage.getItem('token')) {
//   //     setToken(localStorage.getItem('token'));
//   //     getUserCart(localStorage.getItem('token'));
//   //   }
//   // }, [])

//   const value = {
//     products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems,
//     getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setToken, token, setCartItems
//   }

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider;

// fullstack code ends

/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/assets_new.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 40;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [rentalItems, setRentalItems] = useState([]);
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
          totalAmount += itemInfo.sale_price * cartItems[items][size];
        }
      }
    }

    return totalAmount;
  }


  // Function to get total count of items in Renting Cart
  const getCartCount_r = () => {
    return Object.values(rentalItems).reduce((acc, item) => acc + (item.quantity || 0), 0);
  };
  // Function to add an item to the Renting Cart
  const addToCart_r = (itemId) => {
    setRentalItems((prev) => {
      let rentalData = { ...prev };

      // If the item is already in cart, increase count
      if (rentalData[itemId]) {
        rentalData[itemId].quantity += 1;
      } else {
        // Add new item with default rent duration
        rentalData[itemId] = { quantity: 1, duration: 1 };
      }

      return rentalData;
    });
  };

  const updateQuantity_r = (itemId, quantity) => {
    setRentalItems((prev) => {
      let rentalData = { ...prev };

      if (quantity === 0) {
        delete rentalData[itemId]; // Fully remove the item
      } else {
        rentalData[itemId].quantity = quantity;
      }

      return rentalData;
    });
  };

  useEffect(() => {
    console.log(rentalItems);
  }, [rentalItems]);

  const getCartAmount_r = () => {
    let totalAmount = 0;

    for (const itemId in rentalItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue; // Skip if item is missing

      let quantity = rentalItems[itemId].quantity || 0;
      let duration = rentalItems[itemId].duration || 1;

      totalAmount += itemInfo.rent_per_day * quantity * duration;
    }

    console.log(totalAmount);
    return totalAmount;
  };


  const updateDuration = (itemId, rentTime) => {
    setRentalItems((prev) => {
      let rentalData = { ...prev };

      if (rentTime === 0) {
        delete rentalData[itemId]; // Ensure item is fully removed
      } else if (rentalData[itemId]) {
        rentalData[itemId].duration = rentTime;
      }

      return rentalData;
    });
  };



  const value = {
    products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems,
    getCartCount, updateQuantity, getCartAmount, navigate, addToCart_r, rentalItems, setRentalItems,
    getCartCount_r, updateQuantity_r, getCartAmount_r, updateDuration
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;