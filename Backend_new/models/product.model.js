import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    images: {
      type: [String], // Stores file paths or URLs
      validate: {
        validator: function (arr) {
          return arr.length >= 1 && arr.length <= 4; // Minimum 1, Maximum 4 images
        },
        message: "Product must have between 1 and 4 images.",
      },
      required: true,
    },

    availableForRent: {
      type: Boolean,
      default: false,
    },

    availableForSale: {
      type: Boolean,
      default: false,
    },

    rentPerDay: {
      type: Number,
      required: function () {
        return this.availableForRent;
      },
    },

    deposit: {
      type: Number,
      required: function () {
        return this.availableForRent;
      },
    },

    rentalEndDate: {
      type: Date,
      required: function () {
        return this.availableForRent;
      },
    },

    salePrice: {
      type: Number,
      required: function () {
        return this.availableForSale;
      },
    },

    terms: {
      type: String,
      required: true,
    },

    returnPolicy: {
      type: String,
      required: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    },
    isVerifiedProduct: {
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
  { timestamps: true }
);

// Use existing model if available, otherwise create a new one
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;