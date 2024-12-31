import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="bg-[#1E1E1E] text-[#FFF8E7]">
      <motion.div
        className="text-2xl text-center pt-8 border-t"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      >
        <h1 className="text-3xl font-bold">CONTACT US</h1>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="my-10 flex flex-col md:flex-row gap-16 px-8 md:px-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
      >
        {/* Left: Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img 
            src={assets.contactImage} // Add the path for your image here
            alt="Contact Us" 
            className="w-[250px] sm:w-[350px] rounded-lg shadow-2xl" 
          />
        </div>

        {/* Right: Contact Details */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p>
            <span className="text-[#D4AF37CC] font-bold">Our Store:</span><br />
            54709 Willms Station<br />
            Suite 350, Washington, USA<br />
            Tel: (415) 555-0132<br />
            Email: <a href="mailto:admin@forever.com" className="text-[#D4AF37CC]">admin@forever.com</a>
          </p>
        </div>
      </motion.div>
      <NewsLetterBox/>
    </div>
  );
}

export default Contact;
