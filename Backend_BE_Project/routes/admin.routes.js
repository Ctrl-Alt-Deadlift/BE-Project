import express from "express";
import {
  adminLogin,
  removeSupplier,
  removeProduct,
  supplierVerification,
  productVerification,
  editProduct,
  listSuppliers,
  listProducts,
  singleProduct,
  singleSupplier,
} from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

// Authentication route (Public)
adminRouter.post('/login', adminLogin);

// Protected routes (Admin authentication required)
adminRouter.delete('/removeSupplier/:id', adminAuth, removeSupplier);
adminRouter.delete('/removeProduct/:id', adminAuth, removeProduct);
adminRouter.put('/verifySupplier/:id', adminAuth, supplierVerification);
adminRouter.put('/verifyProduct/:id', adminAuth, productVerification);
adminRouter.put('/editProduct/:id', adminAuth, upload.fields([ // Assuming product editing might involve image uploads
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]), adminAuth, editProduct);
adminRouter.get('/listSuppliers', adminAuth, listSuppliers);
adminRouter.get('/listProducts', adminAuth, listProducts);
adminRouter.get('/product/:id', adminAuth, singleProduct);
adminRouter.get('/supplier/:id', adminAuth, singleSupplier);

export default adminRouter;