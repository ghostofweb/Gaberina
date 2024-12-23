import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductItem = ({ id, image, name, price, subCategory }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      className="bg-lighterDark p-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0.5, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <Link to={`/product/${id}`} className="block group">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform ease-in-out duration-500"
          />
        </div>
        {/* Product Details */}
        <div className="mt-4 text-center">
          <p className="text-lg font-playfair font-semibold text-champagne group-hover:text-rose-gold transition duration-300">
            {name}
          </p>
          <p className="text-sm text-buttontxt font-light">{subCategory}</p>
          <p className="mt-1 text-sm font-medium text-gold">{currency}{price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
