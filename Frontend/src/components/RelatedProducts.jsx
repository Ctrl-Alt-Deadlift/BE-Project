/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';
const RelatedProducts = ({ category, subCategory, uid }) => {

  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCpy = products.slice();
      //productCpy = productCpy.filter(item => { return (item.subCategory === subCategory && item.category === category && item._id !== uid) });
      productCpy = productCpy.filter(item => { return (item.category === category && item._id !== uid) });
      productCpy = productCpy.filter(item => { return item.subCategory === subCategory && item._id !== uid });
      // console.log(productCpy.slice(0, 5));
      setRelatedProducts(productCpy.slice(0, 5));
    }
  }, [products])

  return (
    <div className='my-24'>
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          relatedProducts.map((item, index) => (

            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

          )
          )
        }
      </div>
    </div>
  )
}

export default RelatedProducts