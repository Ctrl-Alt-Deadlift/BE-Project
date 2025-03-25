import express from "express";
import {
  addProduct,
  loginSupplier,
  registerSupplier,
  listProducts,
  removeProduct,
  singleProduct,
  editProduct
} from "../controllers/suppliers.controller.js";
import upload from "../middleware/multer.js";

const supplierRouter = express.Router();

supplierRouter.post('/register', upload.fields([{ name: 'photoId', maxCount: 1 }]), registerSupplier);
supplierRouter.post('/login', loginSupplier);
supplierRouter.post('/add', addProduct);
supplierRouter.get('/list', listProducts);
supplierRouter.delete('/remove/:id', removeProduct);
supplierRouter.get('/product/:id', singleProduct);
supplierRouter.put('/edit/:id', editProduct);

export default supplierRouter;
