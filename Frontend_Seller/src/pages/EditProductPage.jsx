import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import EditProduct from './EditProduct.jsx';
import { sellerContext } from '../Context/sellerContext';


const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [Product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(sellerContext);

  useEffect(() => {
    // Fetch product data from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/supplier/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!Product) return <div className="text-center mt-10">Product not found.</div>;
  console.log('Product:', Product.product);
  return <EditProduct existingProduct={Product.product} />;
};

export default EditProductPage;
