import React, { useState, useEffect } from 'react';
import Title from "../components/Title";
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { motion } from 'framer-motion';

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Set the animation flag to true after the component is mounted
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <div className="bg-[#1E1E1E] text-[#FFF8E7]">
      {/* Title Section */}
      <motion.div
        className="text-2xl text-center pt-8 border-t"
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Title text1={'ABOUT'} text2={"US"} />
      </motion.div>

      {/* About Us Section */}
      <motion.div
        className="my-10 flex flex-col md:flex-row gap-16 px-8 md:px-20"
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Left: Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={assets.gaberina}
            alt="Gaberina Perfume"
            className="w-[250px] sm:w-[350px] rounded-lg shadow-2xl"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-[#FDFBF6]">
          <p>
            Gaberina is more than just a perfume brand – it’s a journey into a world of luxury, sophistication, and timeless elegance.
            We believe that fragrance is an art, and each bottle we create is a masterpiece designed to evoke emotions, spark memories,
            and leave a lasting impression.
          </p>
          <p>
            Our team at Gaberina is driven by a passion for excellence, and we work tirelessly to bring you scents that resonate with
            the highest standards of quality and refinement. Every product is a harmonious blend of the finest ingredients, crafted
            with precision and care.
          </p>

          <b className="text-[#D4AF37CC] text-lg">Our Mission</b>
          <p>
            To offer a collection of luxury perfumes that enhance the everyday experience, transforming each moment into something extraordinary.
            We aim to provide our customers with more than just fragrance – we give them a sense of elegance, confidence, and indulgence.
          </p>
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className='text-2xl py-6'
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Title text1={'WHY'} text2={"CHOOSE US"} />
      </motion.div>

      <motion.div
        className='flex flex-col md:flex-row gap-10 justify-between px-8 md:px-20 mb-20'
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* First Box */}
        <motion.div
          className='border border-[#D4AF37CC] px-10 py-8 sm:py-16 flex flex-col gap-5 rounded-lg shadow-lg hover:scale-105 transform transition-all'
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <b className='text-[#D4AF37CC] text-lg font-semibold font-times'>Premium Quality</b>
          <p className='text-sm'>
            We use only the finest ingredients, sourced from around the world, to create unique and captivating fragrances that exceed your expectations.
          </p>
        </motion.div>

        {/* Second Box */}
        <motion.div
          className='border border-[#D4AF37CC] px-10 py-8 sm:py-16 flex flex-col gap-5 rounded-lg shadow-lg hover:scale-105 transform transition-all'
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <b className='text-[#D4AF37CC] text-lg font-semibold font-times'>Sustainability Commitment</b>
          <p className='text-sm'>
            Our commitment to sustainability ensures that every bottle is crafted responsibly, with eco-friendly packaging and ethical sourcing practices.
          </p>
        </motion.div>

        {/* Third Box */}
        <motion.div
          className='border border-[#D4AF37CC]  px-10 py-8 sm:py-16 flex flex-col gap-5 rounded-lg shadow-lg hover:scale-105 transform transition-all'
          initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <b className='text-[#D4AF37CC] text-lg font-semibold font-times'>Exquisite Craftsmanship</b>
          <p className='text-sm'>
            Every fragrance is expertly crafted by skilled artisans, ensuring each bottle delivers a unique sensory experience that reflects the artistry and precision of our team.
          </p>
        </motion.div>
      </motion.div>

      <NewsLetterBox />
    </div>
  );
}

export default About;
