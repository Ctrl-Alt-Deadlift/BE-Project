
import { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';
import { assets } from '../assets/assets.js';
import CartTotal_r from '../components/CartTotal_r.jsx';
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const Cart_r = () => {
  const { products, currency, rentalItems, updateQuantity_r, navigate, updateDuration } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in rentalItems) {
        if (rentalItems[items].quantity > 0) {
          tempData.push({
            _id: items,
            quantity: rentalItems[items].quantity,
            duration: rentalItems[items].duration || 1 // Get stored duration
          });
        }
      }
      setCartData(tempData);
    }
  }, [rentalItems, products]);




  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'RENTAL PICKS'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4rf_2fr_0.5fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.rent_per_day} / day</p>

                    {/* 🔽 Rental Duration Dropdown */}
                    <div className="relative">
                      <select
                        className="border border-gray-300 rounded-md py-2 px-3 text-sm w-full 
               focus:ring-2 focus:ring-gray-400 focus:outline-none 
               appearance-none pr-10 cursor-pointer"
                        value={item.duration} // Bind value to state
                        onChange={(e) => updateDuration(item._id, Number(e.target.value))}// Update duration
                      >
                        {[...Array(15).keys()].map((day) => (
                          <option key={day + 1} value={day + 1}>
                            {day + 1} {day === 0 ? "Day" : "Days"}
                          </option>
                        ))}
                      </select>

                      {/* Custom Arrow Icon */}
                      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                        <MdOutlineArrowDropDownCircle size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value === '0' || e.target.value === '' ? null : updateQuantity_r(item._id, Number(e.target.value))} type="number" className='border max-w-10 sm:max-w-20 sm:px-2 px-1' min={1} value={item.quantity} />
              <img onClick={() => {
                updateQuantity_r(item._id, 0);
                updateDuration(item._id, 0);
              }} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="bin" />
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          {/* 🔽 Pass rentDuration to CartTotal_r */}
          <CartTotal_r />
          <div className='w-full sm:w-[450px]'>
            <button onClick={() => navigate('/place-order')} className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart_r;
