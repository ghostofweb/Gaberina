import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ id, image, name, price, subCategory, fragranceNotes = [] }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      className="bg-lighterDark p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
      initial={{ opacity: 0.5, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Link to={`/product/${id}`} className="block group">
        {/* Product Image Carousel */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <img
            src={image[0]} // Show the first image from the array
            alt={name}
            className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="mt-4 text-center">
          <p className="text-lg font-playfair font-semibold text-champagne group-hover:text-rose-gold transition duration-300">
            {name}
          </p>
          <p className="text-sm text-buttontxt font-light">{subCategory}</p>
          <p className="mt-2 text-sm font-medium text-gold">
            {currency}
            {price["50ml"]} <span className="text-xs text-buttontxt">/ 50ml</span>
          </p>
        </div>
      </Link>

      {/* Fragrance Notes */}
    </motion.div>
  );
};

export default ProductItem;
