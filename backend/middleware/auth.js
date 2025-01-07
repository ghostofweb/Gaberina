import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to authenticate user
const authUser = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Ensure Bearer <token> format is handled
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }
  
    try {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecoded.id; // Attach userId to req.body
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid Token" });
    }
  };
  

export default authUser;
