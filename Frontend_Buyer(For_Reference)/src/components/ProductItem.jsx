
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
    </div>
  );
};

export default ProductItem;