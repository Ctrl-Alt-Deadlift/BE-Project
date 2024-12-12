import Title from "../components/Title.jsx"
import CartTotal from "../components/CartTotal"
import { assets } from '../assets/assets.js'
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx"


const PlaceOrder = () => {

  const [pay_method, set_pay_method] = useState('cod');
  const { navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*Left Side*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="First Name" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Last Name" />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder="email id" />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Street" />
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="City" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder="Pincode" />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Country" />
        </div>

      </div>

      {/*Right Side */}

      <div className='mt-8'>

        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYEMENT'} text2={'METHOD'} />
          {/*--PAYMENT METHOD SELECTION*/}
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => set_pay_method('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${pay_method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => set_pay_method('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${pay_method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => set_pay_method('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${pay_method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='font-bold text-sm mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>
          <div className="flex justify-center">
            <button onClick={() => navigate('/orders')} className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white text-sm my-8 px-8 py-3" >PLACE ORDER</button >
          </div>
        </div>
      </div>


    </div >
  )
}

export default PlaceOrder