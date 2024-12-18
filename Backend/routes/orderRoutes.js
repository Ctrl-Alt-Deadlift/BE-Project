import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middlewares/admitAuth.js'
import authUser from '../middlewares/auth.js'


const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;