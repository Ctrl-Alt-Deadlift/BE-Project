import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


const loginUser = async (req, res) => {
  try {
    // validation done by middleware
    const { emailOrPhone, password } = req.body;
    // Find user by email or phone
    const user = await userModel.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found with provided credentials." });
    }

    // Check if user has a password (i.e. not a Google-only account)
    if (!user.password) {
      return res.status(400).json({ message: "This account was created with Google. Please login with Google." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }]
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email or phone number." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      loginType: "manual", // explicitly set
      // image will be default
    });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listProductsForUser = async (req, res) => {
  try {
    // Fetch products that are verified and belong to a verified supplier.
    const products = await productModel
      .find({
        status: "Verified",
      })
      .populate({
        path: "supplierId",
        select: "name email isVerifiedSupplier", // Select the fields you need
        match: { isVerifiedSupplier: true }, // Filter suppliers that are verified
      });

    // Remove products where the supplier did not match the filter
    const verifiedProducts = products.filter(product => product.supplierId !== null);

    // Check if any products were found
    if (verifiedProducts.length === 0) {
      return res.status(404).json({ message: "No verified products from verified suppliers found." });
    }

    res.status(200).json({ message: "List of verified products.", products: verifiedProducts });
  } catch (error) {
    console.error("Error listing products for user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { registerUser, loginUser, listProductsForUser };
