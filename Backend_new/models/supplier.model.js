import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid phone number"], // Ensures exactly 10 digits
    },

    photoId: {
      type: String, // Will store the file path or URL of the uploaded ID proof
      required: true,
    },

    profilePhoto: {
      type: String,
      required: true,
    },

    supplierGoods: {
      type: [mongoose.Schema.Types.ObjectId], // Array of product IDs
      ref: "product", // Reference to Product Model
      default: [],
    },
    isVerifiedSupplier: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Under Review", "Verified", "Rejected"], // Updated enum values
      default: "Under Review",
    },
    adminMessage: {
      type: String,
    },
    verifiedAt: {
      type: Date,
    },
  },
  { minimize: false, timestamps: true }
);

// Use existing model if available, otherwise create a new one
const supplierModel =
  mongoose.models.supplier || mongoose.model("supplier", supplierSchema);

export default supplierModel;