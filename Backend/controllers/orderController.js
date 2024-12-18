import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import express from 'express';


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

}

// Placing orders using the Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// Display all orders data for admin panel
const allOrders = async (req, res) => {

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

// update order status from admin panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders };