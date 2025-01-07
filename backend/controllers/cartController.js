import userModel from "../models/userModel.js";

// Add Product to User Cart
const addToCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
      console.log("Add to Cart Request:", { userId, itemId, size });
  
      if (!userId || !itemId || !size) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cart = user.cartData || {};
      cart[itemId] = cart[itemId] || {};
      cart[itemId][size] = (cart[itemId][size] || 0) + 1;
  
      user.cartData = cart;
      await user.save();
      console.log("Updated Cart Data:", user.cartData);
  
      res.json({ success: true, message: "Item added to cart", cartData: user.cartData });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ success: false, message: "Error adding item to cart" });
    }
  };
  
  
  
// Update User Cart
const updateCart = async (req, res) => {
    try {
      const { userId, cartData } = req.body;
  
      if (!userId || typeof cartData !== "object") {
        return res.status(400).json({ success: false, message: "Invalid request data" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      user.cartData = cartData;
      await user.save();
  
      res.json({ success: true, message: "Cart updated successfully", cartData: user.cartData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating cart" });
    }
  };
  
  

// Get User Cart Data
const getUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
  };
  const authUser = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"
    console.log("Received token:", token);
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }
  
    try {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecoded.id;

    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, message: "Invalid token, Login Again." });
    }
  };
  

export { addToCart, updateCart, getUserCart };
