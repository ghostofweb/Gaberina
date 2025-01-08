import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Show success toast when the user clicks subscribe
    toast.success('Newsletter subscription successful!', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setEmail(''); // Clear the email input after submission (optional)
  };

  return (
    <>
      {/* Correct ToastContainer here */}
      <ToastContainer />

      <motion.div
        className="text-center py-10 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
      >
        <p className="text-2xl font-bold text-champagne font-times tracking-wide">
          SUBSCRIBE NOW AND GET 20%
        </p>
        <p className="text-buttontxt mt-4 text-md">
          Get the latest updates on events, sales, and exclusive offers. Sign up for our newsletter today!
        </p>
        <form
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          onSubmit={handleSubscribe}
        >
          <motion.input
            className="w-full sm:flex-1 px-4 py-2 bg-lighterDark text-white outline-none rounded-md"
            type="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            type="submit"
            className="bg-champagne hover:bg-buttonhvr text-buttontxt px-6 py-2 rounded-md font-semibold tracking-wide transition duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default NewsLetterBox;
