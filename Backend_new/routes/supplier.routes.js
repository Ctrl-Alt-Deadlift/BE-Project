import express from "express";
import {
  addProduct,
  loginSupplier,
  registerSupplier,
  listProducts,
  removeProduct,
  singleProduct,
  editProduct,
  getSupplierInfo
} from "../controllers/suppliers.controller.js";
import upload from "../middleware/multer.js";
import supplierAuth from "../middleware/supplierAuth.js";

const supplierRouter = express.Router();

supplierRouter.post('/register', upload.fields([{ name: 'photoId', maxCount: 1 }, { name: 'profilePhoto', maxCount: 1 }]), registerSupplier);
supplierRouter.post('/login', loginSupplier);
supplierRouter.post("/add", supplierAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct); // ✅ Requires Token
supplierRouter.get("/list/:id", listProducts); // ❌ Public Route
supplierRouter.delete("/remove/:id", supplierAuth, removeProduct); // ✅ Requires Token
supplierRouter.get("/product/:id", singleProduct); // ❌ Public Route
supplierRouter.put("/edit/:id", supplierAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), editProduct); // ✅ Requires Token
supplierRouter.get("/myinfo", supplierAuth, getSupplierInfo); // ✅ Requires Token

export default supplierRouter;
