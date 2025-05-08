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
  const [supplier, setSupplier] = useState(null);


  const fetchSupplierInfo = async () => {
    try {
      if (!token) {
        toast.error("Authentication token missing. Please login again.");
        return;
      }

      const response = await axios.get(`${backendUrl}/api/supplier/myinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Supplier Info:", response.data.supplier);
      setSupplier(response.data.supplier);


    } catch (error) {
      console.error("Fetch Supplier Info Error:", error);
      toast.error("Failed to load supplier info");
    }
  };


  useEffect(() => {
    if (token) {
      localStorage.setItem('supplierToken', token);
      fetchSupplierInfo();
    } else {
      localStorage.removeItem('supplierToken');
      localStorage.removeItem('supplier');
      setSupplier(null);
    }
  }, [token]);

  const value = {
    backendUrl,
    navigate,
    token,
    setToken,
    supplier,
    setSupplier,
    fetchSupplierInfo
  };

  return (
    <sellerContext.Provider value={value}>
      {props.children}
    </sellerContext.Provider>
  );
};

export default SellerContext;