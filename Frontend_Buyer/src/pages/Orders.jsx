import { useContext, useState, useEffect } from "react"
import Title from "../components/Title.jsx"
import { ShopContext } from "../context/ShopContext.jsx"
import axios from "axios"


const Orders = () => {

  // products is the static data that we were using before the backend development
  // now we are getting the data from the backend we can use the data from the backend and
  // no need to use the static data so you wont see products anymore
  // Initially:
  // const { products, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([]);
  const { products, backendUrl, currency } = useContext(ShopContext);
  let token = useContext(ShopContext)?.token || localStorage.getItem('token');



  const loadOrderData = async (token) => {
    try {
      if (!token) {
        console.log('Token', token);
        console.log('Token not available')
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      console.log(response.data);

      if (response.status === 200) {
        let allOrdersItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            console.log('inside if statement res.status == 200');

            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItems.push(item);
          })
        })

        console.log('printing all orders', allOrdersItems);
        setOrderData(allOrdersItems.reverse());

        console.log('printing orderData', orderData);

      }

    }
    catch (error) {

    }
  }

  useEffect(() => {
    loadOrderData(token);
  }, []);



  return (
    <div>
      <div className="border-t pt-16">
        <div className='text-2xl'>
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div>
          {
            // products.slice(1, 4).map((item, index) => (
            orderData.map((item, index) => (
              <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>{currency}{item.price}</p>
                      <p>Quantity:{item.quantity}</p>
                      <p>Size:{item.size}</p>
                    </div>
                    <p className="mt-2">Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className="mt-2">Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                    <p></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button onClick={() => loadOrderData(token)} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Orders