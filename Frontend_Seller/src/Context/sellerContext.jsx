import { createContext } from "react";
 import { useState, useEffect } from "react";
 import { toast } from "react-toastify";
 import { useNavigate } from "react-router-dom";
 import axios from 'axios'

 export const sellerContext = createContext();

 const SellerContext = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('supplierToken') || '');

  useEffect(() => {
  if (token) {
  localStorage.setItem('supplierToken', token);
  } else {
  localStorage.removeItem('supplierToken');
  localStorage.removeItem('supplier');
  }
  }, [token]);

  const value = {
  backendUrl,
  navigate,
  token,
  setToken
  };

  return (
  <sellerContext.Provider value={value}>
  {props.children}
  </sellerContext.Provider>
  );
 };

 export default SellerContext;