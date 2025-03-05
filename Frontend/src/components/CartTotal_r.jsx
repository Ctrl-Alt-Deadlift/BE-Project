import { useContext } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import Title from './Title';

const CartTotal_r = () => {  // Accept rentDuration as a prop
  const { currency, delivery_fee, getCartAmount_r } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'RENTAL'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount_r()}.00</p>  {/* Pass rentDuration */}
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {getCartAmount_r() === 0 ? 0 : getCartAmount_r() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}
export default CartTotal_r;