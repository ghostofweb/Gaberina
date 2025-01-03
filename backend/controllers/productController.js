//add product 
// total product
// remove 
// single product

import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

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
      message: error.message || 'Internal Server Error',
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
        await productModel.findByIdAndDelete(req.body.id);
    } catch (error) {
        
    }
}
// Funtion for single Product
const singleProduct = async (req, res) => {
    
}
// Funtion for update Product
const updateProduct = async (req, res) => {
    
}

export{addProduct,listProduct,removeProduct,singleProduct,updateProduct}