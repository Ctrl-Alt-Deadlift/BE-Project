// /* eslint-disable react/prop-types */
// import { useContext } from 'react'
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext.jsx'

// const ProductItem = ({ id, image, name, price }) => {

//   const { currency } = useContext(ShopContext);
//   return (
//     <div>
//       <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//         <div className='overflow-hidden'>
//           <img className='hover:scale-110 transition ease-in-out h-[225px]' src={image[0]} alt="" />
//         </div>
//         <p className='pt-3 pb-1 text-sm'>{name}</p>
//         <p className='text-sm font-medium'>{currency}{price}</p>
//       </Link>
//     </div>
//   )
// }

// export default ProductItem

/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductItem = ({ id, image, name, salePrice, rentPrice }) => {
  const handleClick = () => {
    window.scrollTo({ top: 125, behavior: "smooth" });
  };
  return (
    <div className="border p-4 shadow-lg rounded-lg">
      <Link
        className="text-gray-700 cursor-pointer"
        to={`/product/${id}`}
        onClick={handleClick}  // Scroll to top on click
      >
        <div className="overflow-hidden">
          <img className="hover:scale-110 transition ease-in-out h-[225px] w-full" src={image[0]} alt={name} />
        </div>
        <p className="pt-3 pb-1 text-sm font-semibold">{name}</p>
      </Link>

      {/* Display Prices */}
      <div className="mt-2">
        {salePrice && <p className="text-sm font-medium text-green-600">Buy: ₹{salePrice}</p>}
        {rentPrice && <p className="text-sm font-medium text-blue-600">Rent: ₹{rentPrice}/day</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        {salePrice && (
          <button className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700">
            Buy Now
          </button>
        )}
        {rentPrice && (
          <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700">
            Rent Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;