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

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const handleClick = () => {
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  return (
    <div>
      <Link
        className="text-gray-700 cursor-pointer"
        to={`/product/${id}`}
        onClick={handleClick}  // Scroll to top on click
      >
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out h-[225px]"
            src={image[0]}
            alt={name}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;