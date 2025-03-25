import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
// import adminModel from "../models/admin.model.js";


const adminLogin = async (req, res) => {
  res.status(200).json({ message: "API working for admin login" });
};

const adminRegister = async (req, res) => {
  res.status(200).json({ message: "API working for admin registration" });
};



export { adminLogin, adminRegister };