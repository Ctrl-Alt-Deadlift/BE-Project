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
  const { id } = req.params;
  const { isVerifiedSupplier, status, adminMessage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid supplier ID." });
  }

  if (isVerifiedSupplier === undefined || status === undefined || adminMessage === undefined || !status || !adminMessage || isVerifiedSupplier === null || isVerifiedSupplier === "") {
    return res.status(400).json({ message: "Please provide isVerifiedSupplier, status, and adminMessage in the request body." });
  }

  if (typeof isVerifiedSupplier !== 'boolean') {
    return res.status(400).json({ message: "isVerifiedProduct must be a boolean value." });
  }


  if (typeof adminMessage !== 'string') {
    return res.status(400).json({ message: "adminMessage must be a string." });
  }

  if (!["Verified", "Rejected", "Under Review"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  if(status != "Verified" && isVerifiedSupplier == true) {
    return res.status(400).json({ message: "isVerifiedSupplier cannot be true when status is Rejected or Under Review." });
  }

  if(status == "Verified" && isVerifiedSupplier == false) {
    return res.status(400).json({ message: "isVerifiedSupplier cannot be false when status is Verified." });
  }



  try {
    const updatedSupplier = await supplierModel.findByIdAndUpdate(
      id,
      { isVerifiedSupplier, status, adminMessage, verifiedAt: isVerifiedSupplier ? new Date() : undefined },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.status(200).json({ message: "Supplier verification status updated successfully.", supplier: updatedSupplier });
  } catch (error) {
    console.error("Error verifying supplier:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
const productVerification = async (req, res) => {
  const { id } = req.params;
  const { isVerifiedProduct, status, adminMessage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  if (isVerifiedProduct === undefined || status === undefined || adminMessage === undefined) {
    return res.status(400).json({ message: "Please provide isVerifiedProduct, status, and adminMessage in the request body." });
  }

  if (typeof isVerifiedProduct !== 'boolean') {
    return res.status(400).json({ message: "isVerifiedProduct must be a boolean value." });
  }

  if (!["Verified", "Rejected", "Under Review"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  if (typeof adminMessage !== 'string') {
    return res.status(400).json({ message: "adminMessage must be a string." });
  }

  if ((status == "Rejected" || status == "Under Review") && isVerifiedProduct == true) {
    return res.status(400).json({ message: "isVerifiedProduct cannot be true when status is Rejected or Under Review." });
  }

  if ((status == "Verified") && isVerifiedProduct == false) {
    return res.status(400).json({ message: "isVerifiedProduct cannot be false when status is Verified." });
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { isVerifiedProduct, status, adminMessage, verifiedAt: isVerifiedProduct ? new Date() : undefined },
      { new: true, runValidators: true } // Return updated document and run schema validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product verification status updated successfully.", product: updatedProduct });
  } catch (error) {
    console.error("Error verifying product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID." });
    }

    const {
      name, description, quantity, availableForRent, availableForSale,
      rentPerDay, deposit, salePrice, rentalEndDate, terms, returnPolicy, category, subCategory,
      supplierId // Admin can also change the supplier
    } = req.body;

    console.log(`Rent Available: ${availableForRent}, Sale Available: ${availableForSale}`);
    let isAvailableForRentBool = availableForRent?.toString().trim() === "true";
    let isAvailableForSaleBool = availableForSale?.toString().trim() === "true";
    console.log(`isAvailableForRent: ${isAvailableForRentBool}, isAvailableForSale: ${isAvailableForSaleBool}`);

    if (!isAvailableForRentBool && !isAvailableForSaleBool) {
      return res.status(400).json({ message: "Product should be at least for rent or sale" });
    }

    // Validate request body (basic presence checks)
    if (!name || !description || !quantity || !category || !subCategory || !terms || !returnPolicy) {
      return res.status(400).json({ message: "Missing required basic fields." });
    }

    if (isAvailableForRentBool && (!rentPerDay || !deposit || !rentalEndDate)) {
      return res.status(400).json({ message: "Rental details are required if available for rent." });
    }

    if (isAvailableForSaleBool && !salePrice) {
      return res.status(400).json({ message: "Sale price is required if available for sale." });
    }

    // Image handling
    let imagesUrl = [];
    const existingProduct = await productModel.findById(productId);
    if (existingProduct && existingProduct.images) {
      imagesUrl = [...existingProduct.images]; // Start with existing images
    }

    if (req.files && Object.keys(req.files).length > 0) {
      const newImages = [
        req.files.image1?.[0],
        req.files.image2?.[0],
        req.files.image3?.[0],
        req.files.image4?.[0],
      ].filter(Boolean);

      if (newImages.length > 0) {
        // Upload new images to Cloudinary
        const newImagesUrls = await Promise.all(
          newImages.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
          })
        );
        imagesUrl = newImagesUrls; // Replace all images with the newly uploaded ones
      }
    }

    const updatePayload = {
      name,
      description,
      quantity: parseInt(quantity),
      category,
      subCategory,
      availableForRent: isAvailableForRentBool,
      availableForSale: isAvailableForSaleBool,
      rentPerDay: isAvailableForRentBool ? parseFloat(rentPerDay) : null,
      deposit: isAvailableForRentBool ? parseFloat(deposit) : null,
      rentalEndDate: isAvailableForRentBool ? rentalEndDate : null,
      salePrice: isAvailableForSaleBool ? parseFloat(salePrice) : null,
      images: imagesUrl,
      terms,
      returnPolicy,
    };

    // Allow admin to update supplierId if provided and valid
    if (supplierId && mongoose.Types.ObjectId.isValid(supplierId)) {
      updatePayload.supplierId = supplierId;
    } else if (supplierId) {
      return res.status(400).json({ message: "Invalid supplier ID provided." });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product updated successfully by admin.", product: updatedProduct });

  } catch (error) {
    console.error("Error editing product by admin:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

const listSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.find();
    res.status(200).json({ message: "List of suppliers.", suppliers });
  } catch (error) {
    console.error("Error listing suppliers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate('supplierId', 'name email');
    res.status(200).json({ message: "List of products.", products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const singleProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }

  try {
    const product = await productModel.findById(id).populate('supplierId', 'name email');
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Single product details.", product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const singleSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid supplier ID." });
  }

  try {
    const supplier = await supplierModel.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }
    res.status(200).json({ message: "Single supplier details.", supplier });
  } catch (error) {
    console.error("Error fetching single supplier:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};






export { adminLogin, removeSupplier, removeProduct, supplierVerification, productVerification, editProduct, listSuppliers, listProducts, singleProduct, singleSupplier };