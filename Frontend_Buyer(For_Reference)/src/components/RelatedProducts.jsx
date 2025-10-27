import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({ category, subCategory, uid }) => {

  const { Products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (Products.length > 0) {
      // Your filter logic is correct, but can be chained into one filter call
      let filtered = Products.filter(item => {
        return (
          item.category === category &&       // Match category
          item.subCategory === subCategory && // Match subCategory
          item._id !== uid                    // Exclude the current item
        );
      });
      
      setRelatedProducts(filtered.slice(0, 5));
    }
    // 1. ADD dependencies: The related products should update
    // if the category, subCategory, or uid props change.
  }, [Products, category, subCategory, uid]); 

  return (
    <div className='my-24'>
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          relatedProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              // 2. UPDATE: 'item.image' -> 'item.images'
              image={item.images} 
              name={item.name} 
              salePrice={item.salePrice} 
              // 3. UPDATE: 'item.rent_per_day' -> 'item.rentPerDay'
              rentPrice={item.rentPerDay} 
            />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts;