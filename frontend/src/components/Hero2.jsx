import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Hero2 = () => {
  return (
    <div className="px-4 ">
      <div className="flex flex-col-reverse sm:flex-row border-b [#CFC4B9] py-12 mt-2">
        {/* Left Side */}
        <motion.div
          className="w-full sm:w-1/2 flex items-center justify-center mt-6 sm:mt-0"
          initial={{ opacity: 0.5, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <img
            className="w-54 h-auto object-cover sm:w-[60%] rounded-lg shadow-lg"
            src={assets.image3}
            alt="Collection"
          />
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-full sm:w-1/2 flex flex-col items-start justify-center text-charcoal px-4 sm:px-10"
          initial={{ opacity: 0.5, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-2xl lg:text-3xl font-times text-gold mb-4">
            DISCOVER YOUR SIGNATURE SCENT
          </h2>
          <p className="text-base sm:text-lg text-gold leading-relaxed mb-6">
            Explore our carefully crafted collections that bring luxury and elegance into your daily life. From floral to musky notes, find the perfect fragrance that defines you.
          </p>
          <NavLink
            to="/collection"
            className="bg-champagne text-[#FDFBF6] py-2 px-6 rounded-lg font-medium text-sm sm:text-base hover:bg-[#D4AF37CC] transition duration-300"
          >
            Explore Collections
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2;
