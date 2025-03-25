import express from "express"
import { adminLogin, adminRegister } from "../controllers/admin.controller.js";
import upload from "../middleware/multer.js";


const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.post('/register', adminRegister);


export default adminRouter;