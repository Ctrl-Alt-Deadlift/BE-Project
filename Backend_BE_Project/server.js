import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import supplierRouter from './routes/supplier.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'

// Configure App

const app = express();
const port = process.env.PORT || 4000
//connecting with the database
connectDB();
connectCloudinary();

// middlewares

// all the incoming requests will be parsed as json
app.use(express.json());


// Explicit CORS configuration
// Dynamic CORS for all localhost ports
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests without origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // allow any localhost origin (e.g., 5173, 5174, etc.)
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }

    // block everything else
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you use cookies or authentication
};
app.use(cors(corsOptions));


app.use('/api/supplier', supplierRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);



// api endpoints
app.get('/', (req, res) => {
  res.status(200).send(`API is Working.`);
});

app.listen(port, () => console.log(`\n\nBackend server for Final Year Project successfully launched and listening on designated port: ${port}`));
