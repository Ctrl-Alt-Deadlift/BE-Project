import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { sellerContext } from '../Context/sellerContext.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(sellerContext);

  const [product, setProduct] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/supplier/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product Details:', response.data.product);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto ">
      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className="bg-blue-500 text-white mx-2 px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
      >
        &lt; Back to Home
      </button>

      <button
        onClick={() => navigate(`/edit-product/${product.id}`, { state: { existingProduct: product } })}
        className="bg-yellow-500 mx-2 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mb-6"
      >
        Edit Product &gt;
      </button>


      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-500 text-sm mb-6">Product ID: {product.id}</p>

      {/* Images */}
      <div className="flex flex-wrap gap-4 mb-8">
        {product.images && product.images.length > 0 ? (
          product.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Product Image ${index + 1}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          ))
        ) : (
          <p className="text-gray-400">No images available.</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description || 'No description provided.'}</p>
      </div>

      {/* Availability & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Rent Information */}
        {product.availableForRent && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Available for Rent</h3>
            <p className="text-gray-700 mb-1">Rent per Day: ₹{product.rentDetails.rentPerDay}</p>
            <p className="text-gray-700">Security Deposit: ₹{product.rentDetails.deposit}</p>
          </div>
        )}

        {/* Sale Information */}
        {product.availableForSale && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Available for Sale</h3>
            <p className="text-gray-700">Sale Price: ₹{product.salePrice}</p>
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Quantity Available</h2>
        <p className="text-gray-700">{product.quantity} units</p>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
        <p className="text-gray-700">{product.terms || 'No terms and conditions provided.'}</p>
      </div>

      {/* Return Policy */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
        <p className="text-gray-700">{product.returnPolicy || 'No return policy provided.'}</p>
      </div>

      {/* Date Added */}
      <div className="text-sm text-gray-500">
        <p>Added on: {new Date(product.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
