import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const supplierAuth = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from request headers

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // Verify token
    req.supplier = decoded; // Attach supplier info to request
    next(); // Move to next middleware/controller
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default supplierAuth;
