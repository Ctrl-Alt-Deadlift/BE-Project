import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import supplierModel from "../models/supplier.model.js";

// JWT Secret Key (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Function to validate a phone number (exactly 10 digits, only numbers)
const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

// Supplier Registration
const registerSupplier = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const photoIdFiles = req.files?.photoId;
    console.log(req.files);

    // Check for missing fields
    if (!name || !email || !password || !address || !phone || !photoIdFiles) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure only one file is uploaded
    if (!Array.isArray(photoIdFiles) || photoIdFiles.length !== 1) {
      return res.status(400).json({ message: "Only one photo ID file is allowed" });
    }

    const photoIdFile = photoIdFiles[0]; // Get the single file

    // Validate phone number format
    if (!isValidPhoneNumber(phone)) {
      return res.status(400).json({ message: "Invalid phone number. Must be exactly 10 digits." });
    }

    // Check if supplier already exists (by email or phone)
    const existingSupplier = await supplierModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingSupplier) {
      return res.status(409).json({ message: "Supplier already exists with this email or phone number" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload Photo ID to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(photoIdFile.path, { resource_type: "image" });
    const photo_id_url = uploadResult.secure_url;

    // Create Supplier
    const supplier = new supplierModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      photoId: photo_id_url, // Store Cloudinary URL
    });

    await supplier.save();

    // Generate JWT Token
    const token = jwt.sign({ id: supplier._id, email: supplier.email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Supplier registered successfully",
      token,
      supplier: { name, email, phone, address, photoId: photo_id_url },
    });

  } catch (error) {
    console.error("Error in registerSupplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Supplier Login (by Email or Phone)
const loginSupplier = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Email/Phone and Password are required" });
    }

    // Find supplier by email or phone
    const supplier = await supplierModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!supplier) {
      return res.status(401).json({ message: "Supplier not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: supplier._id, email: supplier.email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      token,
      supplier: { name: supplier.name, email: supplier.email, phone: supplier.phone, photoId: supplier.photoId }
    });

  } catch (error) {
    console.error("Error in loginSupplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addProduct = async (req, res) => {
  res.status(200).json({ message: "API working for adding a product" });
};

// Function for listing products
const listProducts = async (req, res) => {
  res.status(200).json({ message: "API working for listing products" });
};

// Function for removing a product
const removeProduct = async (req, res) => {
  res.status(200).json({ message: "API working for removing a product" });
};

// For getting single product information
const singleProduct = async (req, res) => {
  res.status(200).json({ message: "API working for fetching single product information" });
};

// Function for editing a product
const editProduct = async (req, res) => {
  res.status(200).json({ message: "API working for editing a product" });
};


export {
  loginSupplier,
  registerSupplier,
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  editProduct
};
