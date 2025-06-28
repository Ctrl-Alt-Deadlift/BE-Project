import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connected Successfully:", result.status);
  } catch (error) {
    console.error("❌ Cloudinary Connection Error:", error);
  }
};

export default connectCloudinary;
