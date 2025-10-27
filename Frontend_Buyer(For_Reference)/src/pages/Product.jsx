import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js"; // star icons, placeholder, etc.

export default function Product() {
  const { productId } = useParams();
  const { Products = [], currency = "₹", addToCart, addToCart_r } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(assets.placeholder);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find product when Products changes
    const item = Products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      // prefer item.images (array) else try item.image
      const images = Array.isArray(item.images)
        ? item.images
        : typeof item.image === "string"
        ? [item.image]
        : [];
      setMainImage(images[0] || assets.placeholder);
      setThumbIndex(0);
    }
    setLoading(false);
  }, [Products, productId]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-72 bg-gray-200 rounded-lg" />
          <div className="mt-4 h-6 w-3/4 bg-gray-200 rounded" />
          <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="p-6 text-center text-gray-600">
        Product not found.
      </div>
    );
  }

  const images = Array.isArray(productData.images)
    ? productData.images
    : typeof productData.image === "string"
    ? [productData.image]
    : [];

  const handleAddToCart = () => {
    addToCart && addToCart(productData._id, "default");
    toast.success("Added to cart", { autoClose: 1500 });
  };
  const handleAddToRent = () => {
    addToCart_r && addToCart_r(productData._id);
    toast.success("Added to rental", { autoClose: 1500 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Images */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row gap-4">
          {/* Thumbnails (vertical on lg, horizontal on small) */}
          <div className="flex lg:flex-col gap-3 w-full lg:w-20 overflow-x-auto lg:overflow-visible">
            {images.length > 0 ? (
              images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMainImage(src);
                    setThumbIndex(i);
                  }}
                  className={`rounded-md flex-shrink-0 transition-transform transform hover:scale-105 focus:outline-none border ${i === thumbIndex ? "border-black" : "border-transparent"}`}
                >
                  <img
                    src={src}
                    alt={`${productData.name} thumbnail ${i + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = assets.placeholder)}
                  />
                </button>
              ))
            ) : (
              <img src={assets.placeholder} className="h-20 w-20 object-cover rounded-md" alt="placeholder" />
            )}
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full rounded-lg overflow-hidden border bg-gray-50">
              <img
                src={mainImage || assets.placeholder}
                alt={productData.name}
                className="w-full h-[420px] object-contain bg-white"
                onError={(e) => (e.currentTarget.src = assets.placeholder)}
              />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{productData.name}</h1>

            <div className="mt-2 text-sm text-gray-600">
              Category: <span className="text-gray-900 font-medium">{productData.category} → {productData.subCategory}</span>
            </div>

            {/* rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-1">
                <img src={assets.star_icon} alt="star" className="h-4 w-4" />
                <img src={assets.star_icon} alt="star" className="h-4 w-4" />
                <img src={assets.star_icon} alt="star" className="h-4 w-4" />
                <img src={assets.star_icon} alt="star" className="h-4 w-4" />
                <img src={assets.star_dull_icon} alt="star" className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-600">{productData.rating || "4.0"} · {productData.reviewsCount || 12} reviews</span>
            </div>

            {/* Price block */}
            <div className="mt-6">
              {productData.salePrice && (
                <div className="text-3xl font-semibold text-green-600">{currency}{productData.salePrice}</div>
              )}
              {productData.rentPerDay && (
                <div className="mt-1 text-2xl font-semibold text-blue-600">{currency}{productData.rentPerDay} <span className="text-base font-medium text-gray-600">/ day</span></div>
              )}
              {productData.deposit && (
                <div className="mt-2 text-sm text-gray-500">Deposit: <b>{currency}{productData.deposit}</b></div>
              )}
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">{productData.description}</p>

            {/* Availability */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${productData.availableForSale ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {productData.availableForSale ? "Available for Sale" : "Not for Sale"}
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${productData.availableForRent ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}>
                {productData.availableForRent ? "Available for Rent" : "Not for Rent"}
              </span>
              {productData.rentalEndDate && (
                <span className="text-sm text-gray-600">Available till: {new Date(productData.rentalEndDate).toLocaleDateString()}</span>
              )}
            </div>

            {/* Terms & return */}
            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <div><b>Terms & Conditions:</b></div>
              <div className="prose max-w-none text-gray-700">{productData.terms}</div>
              <div className="mt-2"><b>Return Policy:</b> <span className="text-gray-700">{productData.returnPolicy}</span></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {productData.availableForSale && (
              <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 active:scale-95 transition">
                Buy Now
              </button>
            )}
            {productData.availableForRent && (
              <button onClick={handleAddToRent} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:opacity-90 active:scale-95 transition">
                Rent Now
              </button>
            )}

            {/* Small actions */}
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href) && toast.info("Product link copied")}
              className="px-4 py-3 border rounded-lg text-sm"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="mt-10">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} uid={productData._id} />
      </div>
    </div>
  );
}
