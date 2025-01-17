// import { currency } from '../../admin/src/App.jsx';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import express from 'express';
import Stripe from 'stripe';
import razorpay from 'razorpay';

const currency = 'usd';// change if error occurs
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay(
  {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  }
)


// Placing orders using the COD method
const placeOrder = async (req, res) => {

  try {

    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    }

    // create new order
    const newOrder = new orderModel(orderData);
    // save the new order in the database
    await newOrder.save();

    // after the order is placed now clear the cart items
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// Placing orders using the Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const origin = req.headers.origin;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    }
    // create new order
    const newOrder = new orderModel(orderData);
    // save the new order in the database
    await newOrder.save();

    const line_items = items.map((item) => (
      {

        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity

      }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charge',
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({


      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',

    });

    res.status(200).json({ success: true, session_url: session.url });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true, message: "Payment successful" });
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed" });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}
// Placing orders using the Razorpay method
const placeOrderRazorpay = async (req, res) => {

  try {

    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    }
    // create new order
    const newOrder = new orderModel(orderData);
    // save the new order in the database
    await newOrder.save();
    // chances of error in options in the video amount*100 is done
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log('Error in razorpay payment', error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res.status(200).json({ success: true, order });
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}


const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true, message: "Payment successful" });
    }

    else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// Display all orders data for admin panel
const allOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}
// Display user orders data for Frontend
const userOrders = async (req, res) => {

  try {

    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });

  }

  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }

}

// const removeProduct = async (req, res) => {

//   try {
//     await productModel.findByIdAndDelete(req.body.id);
//     const instance = await productModel.findById(req.body.id);
//     if (!instance)
//       res.status(200).json({ success: true, message: "Product removed successfully!" });
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });

//   }
// }
const deleteOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    await orderModel.findByIdAndDelete(orderId);
    const orderInstance = await orderModel.findById(orderId);
    if (!orderInstance)
      res.status(200).json({ success: true, message: "Order removed successfully!" });
    else {
      res.status(500).json({ success: false, message: "Order not removed" });
    }
  }
  catch (error) {
    console.log(error);
  }

}

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {

    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status updated" });

  }

  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });

  }

}

export { verifyRazorpay, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders, verifyStripe, deleteOrder };