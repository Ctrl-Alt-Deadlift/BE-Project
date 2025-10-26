/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi"; // install react-icons if you haven't
import clsx from "clsx"; // optional, useful for conditional classes

const ProductItem = ({ id, image = [], name, salePrice, rentPrice, isNew }) => {
  const imgSrc = image?.[0] || "";

  return (
    <div className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      {/* Image area */}
      <Link to={`/product/${id}`} aria-label={`Open ${name} details`}>
        <div className="relative h-[260px] flex items-center justify-center overflow-hidden rounded-t-2xl bg-gray-50">
          {/* subtle gradient behind image to avoid pure white on white */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-40 pointer-events-none" />

          {/* Image */}
          <img
            src={imgSrc}
            alt={name}
            className="max-h-[220px] w-full object-contain transition-transform duration-400 group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = '/placeholder.png'; }} // optional placeholder path
          />

          {/* Hover overlay with quick actions */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex gap-2 shadow-md">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Add to cart"
                // onClick={() => addToCart(id)}
              >
                <FiShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <Link
                to={`/product/${id}`}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="View product"
                // onClick={() => navigate(`/product/${id}`)}
              >
                <FiEye className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>

          {/* Top-left badge (e.g., New) */}
          {isNew && (
            <div className="absolute left-3 top-3 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              New
            </div>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="px-4 py-3">
        <Link to={`/product/${id}`} className="block" aria-label={`Open ${name} details`}>
          <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {salePrice ? (
              <p className="text-sm font-semibold text-emerald-600">Buy: ₹{salePrice}</p>
            ) : (
              <p className="text-sm text-gray-500">Contact for price</p>
            )}

            {rentPrice && (
              <p className="text-xs text-blue-600 font-medium">Rent: ₹{rentPrice}/day</p>
            )}
          </div>

          {/* CTA button (primary) */}
          <div className="ml-3">
            <Link
              to={`/product/${id}`}
              className={clsx(
                "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition",
                "bg-black text-white hover:bg-gray-900"
              )}
              aria-label={`Open ${name} detail page`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
