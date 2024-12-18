import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/prouductRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoutes.js'

// Configure App

const app = express();
const port = process.env.PORT || 4000
// connecting with the database
connectDB();
connectCloudinary();

// middlewares

// all the incoming requests will be parsed as json
app.use(express.json());

// enable requests from the frontend
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// api endpoints
app.get('/', (req, res) => {
  res.send(`API is Working.`);
});

app.listen(port, () => console.log(`Server has started on PORT: ${port}`));

