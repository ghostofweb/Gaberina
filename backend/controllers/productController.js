//add product 
// total product
// remove 
// single product

import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      fragranceNotes,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory || !sizes || !fragranceNotes) {
      return res.status(400).json({
        success: false,
        message: "All fields except bestseller are required.",
      });
    }

    // Process uploaded files
    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files[key] && req.files[key][0])
      .filter(Boolean); // Remove undefined/null values

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required.",
      });
    }

    // Upload images to Cloudinary
    const imageUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      price: JSON.parse(price), // Ensure it's a valid JSON string
      category,
      subCategory,
      sizes: JSON.parse(sizes), // Ensure it's a valid JSON array
      bestseller: bestseller === 'true', // Convert string to boolean
      fragranceNotes: JSON.parse(fragranceNotes), // Ensure it's a valid JSON array
      image: imageUrl, // Uploaded Cloudinary URLs
      date: Date.now(),
    };

    // Save product to the database
    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Tera Net bakar hai lol',
    });
  }
};


// Funtion for total Product
const listProduct = async (req, res) => {
try {
    const products = await productModel.find({});
    res.json({
        success:true,
        products
    });
} catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
}
}
// Funtion for list Product
const removeProduct = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Validate the ID
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID.',
        });
      }
  
      // Check if the product exists
      const product = await productModel.findById(id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found.',
        });
      }
  
      // Delete the product
      await productModel.findByIdAndDelete(id);
  
      res.json({
        success: true,
        message: 'Product removed successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal Server Error',
      });
    }
  };
  
// Funtion for single Product
const singleProduct = async (req, res) => {
    try {
      // Extracting productId from the body
      const { productId } = req.body;
  
      // Checking if the productId is provided
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required.",
        });
      }
  
      // Finding the product by productId
      const product = await productModel.findById(productId);
  
      // If the product is not found
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // If product is found
      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
  
// Funtion for update Product
const updateProduct = async (req, res) => {
    try {
      // Extract the product ID and data from the request body
      const { productId, name, description, price, category, subCategory, sizes, bestseller, fragranceNotes } = req.body;
  
      // Check if productId is provided
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required.",
        });
      }
  
      // Check if at least one of the fields to update is provided
      if (!name && !description && !price && !category && !subCategory && !sizes && !fragranceNotes && typeof bestseller !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: "At least one field to update is required.",
        });
      }
  
      // Find the product by ID
      const product = await productModel.findById(productId);
  
      // If the product doesn't exist
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // Prepare the updated product data
      const updatedProductData = {
        name: name || product.name,
        description: description || product.description,
        price: price ? JSON.parse(price) : product.price,  // Handle price if provided, otherwise keep the existing one
        category: category || product.category,
        subCategory: subCategory || product.subCategory,
        sizes: sizes ? JSON.parse(sizes) : product.sizes,
        bestseller: typeof bestseller === 'boolean' ? bestseller : product.bestseller,
        fragranceNotes: fragranceNotes ? JSON.parse(fragranceNotes) : product.fragranceNotes,
        date: Date.now(), // Optionally update the date
      };
  
      // Update the product
      const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
  
      res.json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
  

export{addProduct,listProduct,removeProduct,singleProduct,updateProduct}