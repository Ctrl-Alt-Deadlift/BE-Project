/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';


const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLastestProducts] = useState([]);

  useEffect(() => {
    setLastestProducts(products.slice(0, 10));
  }, [products])


  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          These are some of our fresh latest collections from all over India..
        </p>
      </div>
      {/*Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} salePrice={item.sale_price} rentPrice={item.rent_per_day} />
          ))

        }
      </div>
    </div>
  )
}

export default LatestCollection