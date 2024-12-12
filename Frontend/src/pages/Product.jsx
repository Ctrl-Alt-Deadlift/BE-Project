import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js'
import RelatedProducts from '../components/RelatedProducts.jsx';
import { toast } from 'react-toastify';


const Product = () => {

  const { productId } = useParams();
  // console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');



  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {

        setProductData(item);
        // console.log(item);
        setImage(item.image[0]);
        return null;

      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/*Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/*Product Information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_icon} alt="" className='w-3 ' />
            <img src={assets.star_dull_icon} alt="" className='w-3 ' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? `border-orange-500` : ''} `}>{item}</button>
                ))
              }
            </div>

          </div>
          <button onClick={() => {
            if (size !== '') {
              addToCart(productData._id, size);
              toast.success("Item added to cart", {
                autoClose: 2000,
              })
            }

            else {
              toast.warn("Please select a size", {
                autoClose: 2000,
              });
            }
          }} className='bg-black text-white py-3 px-8 active:bg-gray-700 hover:bg-gray-800'>Add to Cart</button>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div className="text-sm text-gray-500 hover:text-gray-600 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-5 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae inventore neque fugiat, quasi amet voluptate quam perferendis rem, doloremque autem iste reprehenderit soluta numquam labore voluptatibus voluptas, quo ab dignissimos dicta fugit.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, eveniet?</p>
        </div>
      </div>

      {/*Similar Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} uid={productData._id} />
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product