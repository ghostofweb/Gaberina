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

    // Create an array to track missing fields
    const missingFields = [];

    // Validate required fields and log missing ones
    if (!name) missingFields.push('name');
    if (!description) missingFields.push('description');
    if (!price) missingFields.push('price');
    if (!category) missingFields.push('category');
    if (!subCategory) missingFields.push('subCategory');
    if (!sizes) missingFields.push('sizes');
    if (!fragranceNotes) missingFields.push('fragranceNotes');

    // If any fields are missing, log and return the error
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields.join(', ')); // Log the missing fields
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
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
  



export{addProduct,listProduct,removeProduct,singleProduct}