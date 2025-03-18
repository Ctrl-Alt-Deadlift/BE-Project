import express from "express"
import { adminLogin, loginSupplier, registerSupplier } from "../controllers/suppliers.controller.js";


const supplierRouter = express.Router();

supplierRouter.post('/register', registerSupplier);
supplierRouter.post('/login', loginSupplier);
supplierRouter.post('/admin', adminLogin);

export default supplierRouter;