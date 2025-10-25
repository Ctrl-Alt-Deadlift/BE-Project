import express from "express"
import { loginUser, registerUser,listProductsForUser } from "../controllers/users.controller.js";
import googleAuth from "../controllers/googleLogin.controller.js";
import { registerValidationRules, validate, loginValidationRules } from '../middleware/validate.js';

const userRouter = express.Router();

userRouter.post('/register', registerValidationRules, validate, registerUser);
userRouter.post('/login', loginValidationRules, validate, loginUser);
userRouter.get('/google-login', googleAuth);
userRouter.get('/listProducts',listProductsForUser)


export default userRouter;