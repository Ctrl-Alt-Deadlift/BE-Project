import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets_new.js'
import RelatedProducts from '../components/RelatedProducts.jsx';
import { toast } from 'react-toastify';
// import Product from './Product';


// const Product = () => {

//   const { productId } = useParams();
//   console.log(productId);
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');



//   const fetchProductData = () => {
//     products.map((item) => {
//       if (item._id === productId) {

//         setProductData(item);
//         // console.log(item);
//         setImage(item.image[0]);
//         return null;

//       }
//     })

//   }

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

//       {/* Product Data*/}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

//         {/*Product Images */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className="flex sm:flex-col overflow-x-auto overflow-y-hidden sm:overflow-y-scroll px-2 justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {
//               productData.image.map((item, index) => (
//                 <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//               ))
//             }
//           </div>
//           <div className=' w-full sm:w-[80%]'>
//             <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>

//         {/*Product Information */}
//         <div className='flex-1'>
//           <h1 className='font-medium text-2xl mt-2'>
//             {productData.name}
//           </h1>
//           <div className="flex items-center gap-1 mt-2">
//             <img src={assets.star_icon} alt="" className='w-3 ' />
//             <img src={assets.star_icon} alt="" className='w-3 ' />
//             <img src={assets.star_icon} alt="" className='w-3 ' />
//             <img src={assets.star_icon} alt="" className='w-3 ' />
//             <img src={assets.star_dull_icon} alt="" className='w-3 ' />
//             <p className='pl-2'>(122)</p>
//           </div>
//           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {
//                 productData.sizes.map((item, index) => (
//                   <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? `border-orange-500 bg-orange-200` : ''} `}>{item}</button>
//                 ))
//               }
//             </div>

//           </div>
//           <button onClick={() => {
//             if (size !== '') {
//               addToCart(productData._id, size);
//               toast.success("Item added to cart", {
//                 autoClose: 2000,

//               })
//             }

//             else {
//               toast.warn("Please select a size", {
//                 autoClose: 2000,
//               });
//             }
//           }} className='bg-black text-white py-3 px-8 active:bg-gray-700 hover:bg-gray-800'>Add to Cart</button>
//           <hr className='mt-8 sm:w-4/5'></hr>
//           <div className="text-sm text-gray-500 hover:text-gray-600 mt-5 flex flex-col gap-1">
//             <p>100% original product</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

// {/* Description and Reviews */ }
// <div className="mt-20">
//   <div className='flex'>
//     <b className='border px-5 py-3 text-sm'>Description</b>
//     <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//   </div>
//   {/* <div className='flex flex-col gap-2 border px-5 py-6 text-sm text-gray-500'>
//           <p className='text-gray-600 text-bold'>What customers say about this product.</p>
//           <p className='text-green-500'>Customers says the quality  of material is decent and the fit is also up to the mark.</p>
//           <p className='text-red-500'>Customers express concerns about the time it takes to deliver the product.</p>
//           <div className='flex gap-2 items-center mt-[20px]'>
//             <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//             <img className='h-3 w-3' src={assets.star_icon} alt="" />
//             <img className='h-3 w-3' src={assets.star_icon} alt="" />
//             <img className='h-3 w-3' src={assets.star_icon} alt="" />
//             <img className='h-3 w-3' src={assets.star_icon} alt="" />
//             <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//           </div>


//           <p>I recently purchased this product, and overall, I’m moderately satisfied. The quality of the material is decent and feels durable, which is a big plus. The fit is also great—exactly as described, so no complaints there. However, the delivery process was quite frustrating. It took much longer than expected, which dampened the overall experience. If the delivery time were improved, this would easily be a much better purchase. For now, I’d recommend this product for its quality and fit, but be prepared to wait a bit longer for it to arrive.</p>
//         </div> */}
//   <div className='flex flex-col gap-2 border px-5 py-6 text-sm text-gray-500'>
//     <p className='text-gray-600 font-bold'>What customers say about this product.</p>
//     <div className='mb-4'>
//       <p className='text-green-500 font-semibold'>Pros: High-quality material, perfect fit, and durable design.</p>
//       <p className='text-red-500 font-semibold'>Cons: Delivery process is slow and needs improvement.</p>
//     </div>

//     {/* Dummy Reviews */}
//     <div className='flex flex-col gap-6'>
//       {/* Review 1 */}
//       <div>
//         <div className='flex gap-2 items-center'>
//           <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//         </div>
//         <p>Good quality and comfortable fit, but delivery took longer than expected.</p>
//       </div>

//       {/* Review 2 */}
//       <div>
//         <div className='flex gap-2 items-center'>
//           <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//         </div>
//         <p>The material is fine, but the delivery delays were disappointing.</p>
//       </div>

//       {/* Review 3 */}
//       <div>
//         <div className='flex gap-2 items-center'>
//           <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//         </div>
//         <p>Perfect fit and great quality! The product was worth the wait.</p>
//       </div>

//       {/* Review 4 */}
//       <div>
//         <div className='flex gap-2 items-center'>
//           <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//         </div>
//         <p>The fit is nice, but I was not happy with the delivery time.</p>
//       </div>

//       {/* Review 5 */}
//       <div>
//         <div className='flex gap-2 items-center'>
//           <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//           <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
//         </div>
//         <p>The product quality is good, but the slow delivery is a concern.</p>
//       </div>
//     </div>
//     <p className='text-gray-400 mt-[20px] cursor-pointer hover:text-gray-500'>read more...</p>
//   </div>

// </div>

//       {/*Similar Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} uid={productData._id} />
//     </div>
//   ) : <div className="opacity-0"></div>
// }

// export default Product


const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]); // Set first image as default
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* Product Details */}
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-hidden sm:overflow-y-scroll px-2 justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt={productData.name}
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>

          <div className="mt-2 text-gray-500 text-sm">
            Category: <span className="text-black">{productData.category} → {productData.subcategory}</span>
          </div>

          <div className='flex gap-2 items-center mt-[20px]'>
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
          </div>


          <p className="mt-5 text-3xl font-medium">{currency}{productData.rent_per_day} / day</p>
          <p className="mt-2 text-gray-500 text-sm">
            <b>Deposit Required:</b> {currency}{productData.deposit}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Availability Status */}
          <div className="mt-5">
            <p className="text-sm">
              {productData.available_for_rent ? "Available for Rent ✅" : "Not Available for Rent ❌"}
            </p>
            <p className="text-sm">
              {productData.available_for_sale ? "Available for Sale ✅" : "Not Available for Sale ❌"}
            </p>
          </div>

          {/* Rental Duration */}
          <div className="mt-5 text-sm">
            <p><b>Available Till:</b> {new Date(productData.available_till).toLocaleDateString()}</p>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-5 text-sm text-gray-600">
            <b>Terms & Conditions:</b>
            <p>{productData.terms_n_conditions}</p>
          </div>

          {/* Return Policy */}
          <div className="mt-3 text-sm text-gray-600">
            <b>Return Policy:</b>
            <p>{productData.return_policy}</p>
          </div>

          {/* Add to Cart / Rent Now */}
          <div className='flex gap-2'>
            {/* Buy Now Button (Only if available_for_sale is true) */}
            {productData.available_for_sale && (
              <button
                onClick={() => {
                  addToCart(productData._id);
                  toast.success("Item added to cart", { autoClose: 2000 });
                }}
                className="bg-black text-white py-3 px-8 active:bg-gray-700 hover:bg-gray-800 mt-5"
              >
                Buy Now
              </button>
            )}

            {/* Rent Now Button (Only if available_for_rent is true) */}
            {productData.available_for_rent && (
              <button
                onClick={() => {
                  addToCart(productData._id);
                  toast.success("Item added to rental", { autoClose: 2000 });
                }}
                className="bg-green-500 text-white py-3 px-8 active:bg-gray-700 hover:bg-gray-800 mt-5"
              >
                Rent Now
              </button>
            )}

          </div>


          <hr className="mt-8 sm:w-4/5"></hr>
          <div className="text-sm text-gray-500 hover:text-gray-600 mt-5">
            <p>100% original product</p>
            <p>Damage charges apply as per terms.</p>
            <p>Refund policy varies for rentals & sales.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        {/* <div className='flex flex-col gap-2 border px-5 py-6 text-sm text-gray-500'>
          <p className='text-gray-600 text-bold'>What customers say about this product.</p>
          <p className='text-green-500'>Customers says the quality  of material is decent and the fit is also up to the mark.</p>
          <p className='text-red-500'>Customers express concerns about the time it takes to deliver the product.</p>
          <div className='flex gap-2 items-center mt-[20px]'>
            <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_icon} alt="" />
            <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
          </div>


          <p>I recently purchased this product, and overall, I’m moderately satisfied. The quality of the material is decent and feels durable, which is a big plus. The fit is also great—exactly as described, so no complaints there. However, the delivery process was quite frustrating. It took much longer than expected, which dampened the overall experience. If the delivery time were improved, this would easily be a much better purchase. For now, I’d recommend this product for its quality and fit, but be prepared to wait a bit longer for it to arrive.</p>
        </div> */}
        <div className='flex flex-col gap-2 border px-5 py-6 text-sm text-gray-500'>
          <p className='text-gray-600 font-bold'>What customers say about this product.</p>
          <div className='mb-4'>
            <p className='text-green-500 font-semibold'>Pros: High-quality material, perfect fit, and durable design.</p>
            <p className='text-red-500 font-semibold'>Cons: Delivery process is slow and needs improvement.</p>
          </div>

          {/* Dummy Reviews */}
          <div className='flex flex-col gap-6'>
            {/* Review 1 */}
            <div>
              <div className='flex gap-2 items-center'>
                <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
              </div>
              <p>Good quality and comfortable fit, but delivery took longer than expected.</p>
            </div>

            {/* Review 2 */}
            <div>
              <div className='flex gap-2 items-center'>
                <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
              </div>
              <p>The material is fine, but the delivery delays were disappointing.</p>
            </div>

            {/* Review 3 */}
            <div>
              <div className='flex gap-2 items-center'>
                <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
              </div>
              <p>Perfect fit and great quality! The product was worth the wait.</p>
            </div>

            {/* Review 4 */}
            <div>
              <div className='flex gap-2 items-center'>
                <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
              </div>
              <p>The fit is nice, but I was not happy with the delivery time.</p>
            </div>

            {/* Review 5 */}
            <div>
              <div className='flex gap-2 items-center'>
                <img className='h-6 w-6 mr-5' src={assets.profile_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
                <img className='h-3 w-3' src={assets.star_dull_icon} alt="" />
              </div>
              <p>The product quality is good, but the slow delivery is a concern.</p>
            </div>
          </div>
          <p className='text-gray-400 mt-[20px] cursor-pointer hover:text-gray-500'>read more...</p>
        </div>

      </div>
      {/*Similar Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} uid={productData._id} />
    </div>
  ) : <div className="opacity-0"></div>;


}

export default Product;