import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      className="inline-flex gap-2 items-center mb-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.3, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ once: true, amount: 1 }}
    >
      <p className="text-grey-500 font-times font-bold text-gold">
        {text1}{' '}
        <span className="text-buttontxt font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-buttontxt"></p>
    </motion.div>
  );
};

export default Title;
