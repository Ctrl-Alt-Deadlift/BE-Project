import express from "express"
import { adminLogin, loginSupplier, registerSupplier } from "../controllers/suppliers.controller.js";
import upload from "../middleware/multer.js";


const supplierRouter = express.Router();

supplierRouter.post('/register', upload.fields([{ name: 'photoId', maxCount: 1 }]), registerSupplier);
supplierRouter.post('/login', loginSupplier);
supplierRouter.post('/admin', adminLogin);

export default supplierRouter;