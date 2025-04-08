import express from "express"
import { adminLogin, removeSupplier } from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";


const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.delete('/removeSupplier/:id', adminAuth, removeSupplier);



export default adminRouter;