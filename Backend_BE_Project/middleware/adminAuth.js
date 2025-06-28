import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from request headers

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No admin token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET_ADMIN); // Verify token

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({ message: "Unauthorized access. Invalid admin role or ID." });
    }

    req.adminId = decoded.adminId; // Attach admin ID to request
    console.log("Admin ID from token:", req.adminId); // Print the admin ID for understanding
    next(); // Move to next middleware/controller
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired admin token." });
  }
};

export default adminAuth;