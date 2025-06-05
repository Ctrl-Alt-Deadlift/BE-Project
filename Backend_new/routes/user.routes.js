import express from "express"
import { loginUser, registerUser } from "../controllers/users.controller.js";
import googleAuth from "../controllers/googleLogin.controller.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/google-login',googleAuth);


export default userRouter;