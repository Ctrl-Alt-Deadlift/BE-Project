import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import supplierModel from "../models/supplier.model.js";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";

// JWT Secret Key (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Function to validate a phone number (exactly 10 digits, only numbers)
const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

const registerSupplier = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const photoIdFiles = req.files?.photoId;
    const profilePhotoFiles = req.files?.profilePhoto;

    // Check for missing fields
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!photoIdFiles) {
      return res.status(400).json({ message: "Please upload a photo ID file" });
    }

    if (!profilePhotoFiles) {
      return res.status(400).json({ message: "Please upload a profile photo file" });
    }

    // Ensure only one file for each
    if (!Array.isArray(photoIdFiles) || photoIdFiles.length !== 1) {
      return res.status(400).json({ message: "Only one photo ID file is allowed" });
    }

    if (!Array.isArray(profilePhotoFiles) || profilePhotoFiles.length !== 1) {
      return res.status(400).json({ message: "Only one profile photo file is allowed" });
    }

    const photoIdFile = photoIdFiles[0]; // Get the single photoId file
    const profilePhotoFile = profilePhotoFiles[0]; // Get the single profilePhoto file

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
    const photoIdUploadResult = await cloudinary.uploader.upload(photoIdFile.path, { resource_type: "image" });
    const photo_id_url = photoIdUploadResult.secure_url;

    // Upload Profile Photo to Cloudinary
    const profilePhotoUploadResult = await cloudinary.uploader.upload(profilePhotoFile.path, { resource_type: "image" });
    const profile_photo_url = profilePhotoUploadResult.secure_url;

    // Create Supplier with both photoId and profilePhoto
    const supplier = new supplierModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      photoId: photo_id_url,
      profilePhoto: profile_photo_url,
      isVerifiedSupplier: false,
      status: "Under Review",
      adminMessage: "Your application is under review.",
    });

    await supplier.save();

    // Generate JWT Token
    const token = jwt.sign({ id: supplier._id, email: supplier.email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Supplier registered successfully",
      token,
      supplier: {
        name,
        email,
        phone,
        address,
        photoId: photo_id_url,
        profilePhoto: profile_photo_url,
        isVerifiedSupplier: false,
        status: "Under Review",
        adminMessage: "Your application is under review.",
      },
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
      supplier: { name: supplier.name, email: supplier.email, phone: supplier.phone, photoId: supplier.photoId, supplierVerified: supplier.isVerifiedSupplier, status: supplier.status, adminMessage: supplier.adminMessage },
    });

  } catch (error) {
    console.error("Error in loginSupplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSupplierInfo = async (req, res) => {
  try {
    // 1. Supplier ID is coming from the auth middleware
    const supplierId = req.supplier.id;

    // 2. Fetch supplier data from database
    const supplier = await supplierModel.findById(supplierId)
      .select("-password -__v") // remove sensitive fields
      .lean();

    // 3. Check if supplier exists
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // 4. Respond with supplier data
    return res.status(200).json({
      message: "Supplier info fetched successfully",
      supplier,
    });
  } catch (error) {
    console.error("Error fetching supplier info:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const supplierid = req.supplier.id; // Get supplier ID from decoded token

    // Fetch the supplier document from the database
    const supplier = await supplierModel.findById(supplierid);

    if (!supplier) {
      return res.status(401).json({ message: "Supplier not found" });
    }

    // Check if supplier is verified
    if (!supplier.isVerifiedSupplier || supplier.status !== "Verified") {
      return res.status(403).json({
        message: "You are not authorized to add products.",
        error: {
          supplierStatus: supplier.status,
          isVerifiedSupplier: supplier.isVerifiedSupplier,
          adminMessage: supplier.adminMessage,
        },
      });
    }


    const {
      name, description, quantity, availableForRent, availableForSale,
      rentPerDay, deposit, salePrice, rentalEndDate, terms, returnPolicy, category, subCategory
    } = req.body;


    let isAvailableForRent = availableForRent?.toString().trim() === "true";
    let isAvailableForSale = availableForSale?.toString().trim() === "true";

    if (!isAvailableForRent && !isAvailableForSale) {
      return res.status(400).json({ message: "Product should be atleast for rent or sale" });
    }

    console.log(availableForRent, availableForSale);
    console.log(isAvailableForRent, isAvailableForSale);

    // take images from upload files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    if (images.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image." });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    if (!name || !description || !quantity || !category || !subCategory) {
      console.log('\n\n\nName', name, '\nDescription', description, '\nQuantity', quantity, '\nisAvailableForRent', isAvailableForRent, '\nisAvailableForSale', isAvailableForSale);
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (isAvailableForRent && (!rentPerDay || !deposit || !rentalEndDate)) {
      return res.status(400).json({ message: "Rental details are required." });
    }

    if (isAvailableForSale && !salePrice) {
      return res.status(400).json({ message: "Sale price is required." });
    }

    // Get supplier ID from token (attached by supplierAuth middleware)
    const supplierId = req.supplier.id;

    // Create new product
    const newProduct = new productModel({
      supplierId,
      name,
      description,
      quantity,
      category,
      subCategory,
      availableForRent: isAvailableForRent,
      availableForSale: isAvailableForSale,
      rentPerDay: isAvailableForRent ? rentPerDay : null,
      deposit: isAvailableForRent ? deposit : null,
      rentalEndDate: isAvailableForRent ? rentalEndDate : null,
      salePrice: isAvailableForSale ? salePrice : null,
      images: imagesUrl, // Store Cloudinary URLs
      terms,
      returnPolicy
    });

    await newProduct.save();


    // Update the supplier's document by adding the product ID to supplierGoods
    try {
      await supplierModel.findByIdAndUpdate(
        supplierId,
        { $push: { supplierGoods: newProduct._id } }, // Push product ID to supplierGoods
        { new: true } // Return updated document
      );
      res.status(201).json({ message: "Product added successfully.", product: newProduct });
    }

    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Some issue in syncing new product with supplierGoods" });
    }

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
// Function for listing products
const listProducts = async (req, res) => {
  try {
    const supplierId = req.params.id;
    console.log(req.params.id)

    if (!supplierId) {
      return res.status(400).json({ message: "Supplier ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      return res.status(400).json({ message: "Invalid supplier ID." });
    }

    const supplier = await supplierModel.findById(supplierId).populate(
      "supplierGoods"
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    const products = supplier.supplierGoods;

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
// Function for removing a product
const removeProduct = async (req, res) => {
  try {
    const { id: productId } = req.params; // Extract product ID from URL
    console.log(req.params);
    console.log(req.supplier);
    const supplierId = req.supplier.id; // Extract supplier ID from authenticated user

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "productModel not found" });
    }

    // Ensure the product belongs to the supplier
    if (product.supplierId.toString() !== supplierId) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // Delete the product
    await productModel.findByIdAndDelete(productId);

    // Remove the product from the supplier's `goods` array
    await supplierModel.findByIdAndUpdate(
      supplierId,
      { $pull: { supplierGoods: productId } }, // Remove product ID from `goods`
      { new: true }
    );

    res.status(200).json({ success: true, message: "Product removed successfully", removedProductid: productId });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// For getting single product information
const singleProduct = async (req, res) => {
  try {
    const { id: productId } = req.params; // Extract product ID from URL

    // Find the product and populate supplier details (only name and address)
    const product = await productModel.findById(productId).populate({
      path: "supplierId",
      select: "name address", // Only fetch supplier name & address
    });

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product with the given ID not found",
      });
    }

    // Structured response
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        category: product.category,
        subCategory: product.subCategory,
        images: product.images,
        availableForRent: product.availableForRent,
        availableForSale: product.availableForSale,
        rentDetails: product.availableForRent
          ? {
            rentPerDay: product.rentPerDay,
            deposit: product.deposit,
            rentalEndDate: product.rentalEndDate,
          }
          : null,
        salePrice: product.availableForSale ? product.salePrice : null,
        terms: product.terms,
        returnPolicy: product.returnPolicy,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,

        supplier: {
          id: product.supplierId._id,
          name: product.supplierId.name,
          address: product.supplierId.address,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to retrieve product.",
    });
  }
};
// Function for editing a product
const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const supplierId = req.supplier.id;
    const {
      name, description, quantity, availableForRent, availableForSale,
      rentPerDay, deposit, salePrice, rentalEndDate, terms, returnPolicy, category, subCategory
    } = req.body;
    console.log(`Rent Available: ${availableForRent}, Sale Available: ${availableForSale}`);
    let isAvailableForRent = availableForRent?.toString().trim() === "true";
    let isAvailableForSale = availableForSale?.toString().trim() === "true";
    console.log(`isAvailableForRent: ${isAvailableForRent}, isAvailableForSale: ${isAvailableForSale}`);
    if (!isAvailableForRent && !isAvailableForSale) {
      return res.status(400).json({ message: "Product should be atleast for rent or sale" });
    }

    // Check if product exists and belongs to the supplier
    const product = await productModel.findOne({ _id: productId, supplierId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized." });
    }

    // Validate request body
    if (!name || !description || !quantity || !category || !subCategory) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (isAvailableForRent && (!rentPerDay || !deposit || !rentalEndDate)) {
      return res.status(400).json({ message: "Rental details are required." });
    }

    if (isAvailableForSale && !salePrice) {
      return res.status(400).json({ message: "Sale price is required." });
    }

    // Image handling
    let imagesUrl = product.images; // Default to existing images

    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined);

      if (newImages.length > 0) {
        // Upload new images to Cloudinary
        const newImagesUrls = await Promise.all(
          newImages.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
          })
        );
        imagesUrl = newImagesUrls; // Replace existing images
      }
    }

    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        quantity,
        category,
        subCategory,
        availableForRent: isAvailableForRent,
        availableForSale: isAvailableForSale,
        rentPerDay: isAvailableForRent ? rentPerDay : null,
        deposit: isAvailableForRent ? deposit : null,
        rentalEndDate: isAvailableForRent ? rentalEndDate : null,
        salePrice: isAvailableForSale ? salePrice : null,
        images: imagesUrl,
        terms,
        returnPolicy
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update product." });
    }

    res.status(200).json({ message: "Product updated successfully.", product: updatedProduct });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};


export {
  loginSupplier,
  registerSupplier,
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  editProduct,
  getSupplierInfo
};
