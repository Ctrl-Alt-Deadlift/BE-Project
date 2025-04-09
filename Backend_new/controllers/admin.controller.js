import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Consider using bcrypt
import dotenv from "dotenv";
import mongoose from "mongoose";
import supplierModel from "../models/supplier.model.js";
import productModel from "../models/product.model.js";

dotenv.config(); // Load environment variables

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const adminCredentials = [
    {
      username: process.env.ADMIN_USERNAME_1,
      password: process.env.ADMIN_PASSWORD_1,
    },
    {
      username: process.env.ADMIN_USERNAME_2,
      password: process.env.ADMIN_PASSWORD_2,
    },
    {
      username: process.env.ADMIN_USERNAME_3,
      password: process.env.ADMIN_PASSWORD_3,
    },
  ];

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  let adminId = null;

  for (const admin of adminCredentials) {
    if (username === admin.username && password === admin.password) {
      adminId = username; // Use username as identifier
      break;
    }
  }

  if (adminId) {
    // Authentication successful
    const adminIdentifier = { role: "admin", adminId };

    const token = jwt.sign(adminIdentifier, JWT_SECRET_ADMIN, { expiresIn: "1h" });

    return res.status(200).json({ message: "Admin login successful.", token });
  } else {
    // Authentication failed
    return res.status(401).json({ message: "Invalid credentials." });
  }
};

const removeSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid supplier ID." });
  }

  try {
    const supplier = await supplierModel.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    // Remove all products associated with the supplier
    await productModel.deleteMany({ supplierId: id });

    // Remove the supplier itself
    const deletedSupplier = await supplierModel.findByIdAndDelete(id);

    if (deletedSupplier) {
      res.status(200).json({ message: "Supplier and associated products removed successfully." });
    } else {
      // This case should ideally not happen if findById worked, but for safety:
      res.status(500).json({ message: "Failed to remove supplier." });
    }
  } catch (error) {
    console.error("Error removing supplier:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const supplierId = product.supplierId;

    // Remove the product
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (deletedProduct) {
      // Remove the product's ID from the supplier's supplierGoods array
      await supplierModel.findByIdAndUpdate(
        supplierId,
        { $pull: { supplierGoods: id } },
        { new: true } // Optional: Return the updated supplier document
      );

      res.status(200).json({ message: "Product removed successfully." });
    } else {
      // This case should ideally not happen if findById worked, but for safety:
      res.status(500).json({ message: "Failed to remove product." });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

const supplierVerification = async (req, res) => {
  res.status(200).json({ message: "Supplier verified successfully." });
}
const productVerification = async (req, res) => {
  res.status(200).json({ message: "Product verified successfully." });
}

const editProduct = async (req, res) => {
  res.status(200).json({ message: "Product edited successfully." });
}

const listSuppliers = async (req, res) => {
  res.status(200).json({ message: "List of suppliers." });
}

const listProducts = async (req, res) => {
  res.status(200).json({ message: "List of products." });
}

const singleProduct = async (req, res) => {
  res.status(200).json({ message: "Single product details." });
}

const singleSupplier = async (req, res) => {
  res.status(200).json({ message: "Single supplier details." });
}






export { adminLogin, removeSupplier, removeProduct, supplierVerification, productVerification, editProduct, listSuppliers, listProducts, singleProduct, singleSupplier };