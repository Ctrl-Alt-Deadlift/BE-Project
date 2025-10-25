import { useContext, useState, useEffect } from "react"
import { BuyerContext } from "../context/BuyerContext.jsx"
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';


const LatestCollection = () => {

  const { products } = useContext(BuyerContext);
  const [latestProducts, setLastestProducts] = useState([]);

  useEffect(() => {
    setLastestProducts(products.slice(0, 10));
    console.log(products);
  }, [products])


  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'TOP RENTALS'} text2={'AND SALES'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          These are some of our fresh latest collections from all over India..
        </p>
      </div>
      {/*Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images} // Access the first image from the array
              name={item.name}
              salePrice={item.salePrice} // Corrected prop name
              rentPrice={item.rentPerDay} // Corrected prop name
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection;