import Title from "../components/Title.jsx"
import CartTotal from "../components/CartTotal"
import { assets } from '../assets/assets.js'
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import { toast } from "react-toastify"
import axios from "axios"


const PlaceOrder = () => {


  const [pay_method, set_pay_method] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      let orderItems = [];
      for (const items in cartItems) {

        for (const item in cartItems[items]) {

          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }

      }
      // console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (pay_method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          //  console.log(response);
          if (response.status === 200) {
            setCartItems({});
            navigate('orders');
          }
          else {
            toast.error(response.data.message);
          }
          break;


        default:
          break;
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);

    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*Left Side*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="First Name" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder="email id" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="City" />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder="Pincode" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder="Phone Number" />

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
            <button type='submit' className="bg-black hover:bg-gray-900 active:bg-gray-800 text-white text-sm my-8 px-8 py-3" >PLACE ORDER</button >
          </div>
        </div>
      </div>


    </form >
  )
}

export default PlaceOrder