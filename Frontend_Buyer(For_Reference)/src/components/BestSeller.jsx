import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx';


const BestSeller = () => {

  const { Products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

useEffect(() => {
    // Filter products that are available for rent AND NOT available for sale
    const rentOnlyProducts = Products.filter(product => 
      product.availableForRent === true 
    );
    
    // Set the first 5 items from that filtered list
    setBestSeller(rentOnlyProducts.slice(0, 5));
  }, [Products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'TOP'} text2={'RENTALS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'>
          Some of our top rentals...
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          bestSeller.map((item, index) => (
            <ProductItem 
                        key={index} 
                        id={item._id} 
                        image={item.images}     // Changed from 'image'
                        name={item.name} 
                        salePrice={item.salePrice} // Changed from 'sale_price'
                        rentPrice={item.rentPerDay} // Changed from 'rent_per_day'
                      />
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller