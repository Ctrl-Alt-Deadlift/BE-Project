import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { sellerContext } from '../Context/sellerContext.jsx';
import Navbar from '../components/Navbar.jsx';



const Home = () => {
  const [products, setProducts] = useState([]);
  const { token, backendUrl, navigate } = useContext(sellerContext); // Assuming you have a context for the token and backend URL

  const checkRentorSale = (product) => {
    if (product.availableForRent && product.availableForSale) {
      return 'Available for Rent and Sale';
    }

    else if (product.availableForRent) {
      return 'Available for Rent';
    }

    else {
      return 'Available for Sale';
    }
  }

  const fetchSaleAndRent = (product) => {
    if (product.availableForRent && product.availableForSale) {
      return `Rent Price: ₹${product.rentPerDay} / Sale Price: ₹${product.salePrice}`;
    } else if (product.availableForRent) {
      return `Rent Price: ₹${product.rentPerDay}`;
    } else {
      return `Sale Price: ₹${product.salePrice}`;
    }
  }

  const fetchSupplierProducts = async () => {
    try {
      const authToken = token;

      if (!authToken) {
        console.error('Token not found.');
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const supplierId = payload.id;

      const response = await axios.get(`${backendUrl}/api/supplier/list/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const products = response.data.products;
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchSupplierProducts();
  }, []);

  return (
    <div className="flex">
      <Navbar />

      <div className="flex flex-col items-center justify-start mt-20 w-full p-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Products</h2>

        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-all"
            >
              {/* Left Section - Image */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-md overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">No Image</span>
                  )}
                </div>

                {/* Middle Section - Name and Availability */}
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{product.name}</p>
                  <p className="text-gray-600 text-sm">{checkRentorSale(product)}</p>
                  {/* You can make this dynamic later if you want */}
                </div>
              </div>

              {/* Right Section - Price and Button */}
              <div className="flex items-center gap-4">

                <div>{fetchSaleAndRent(product)}</div>
                <button
                  onClick={() => {
                    navigate(`/product/${product._id}`); // Navigate to product details page

                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* If no products */}
        {products.length === 0 && (
          <p className="text-gray-500 mt-10">No products found. Add some products!</p>
        )}
      </div>
    </div >
  );
};

export default Home;
