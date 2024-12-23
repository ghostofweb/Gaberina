import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row  border-t [#CFC4B9] py-12 sm:py-10 md:py-8 lg:py-12'>
      {/* Hero Left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
    <div className='text-gold'>
      <div className='flex items-center gap-2'>
        <p className='w-8 md:w-11 h-[2px] bg-gold'></p>
        <p className='font-medium text-sm md:text-base'>WHERE ELEGANCE MEETS INNOVATION</p>
      </div>
      <h1 className='text-3xl sm:py-3 lg:text-4xl leading-relaxed font-times'>
        EMBRACE THE ART OF FRAGRANCE
      </h1>
      <div className='flex items-center gap-2'>
        <p className='font-semibold text-sm md:text-base'>EXPERIENCE EXCEPTIONAL CRAFT</p>
        <p className='w-8 md:w-11 h-[1px] bg-gold'></p>
      </div>
    </div>
  </div>

      {/* Right side */}
      <div className='w-full px-4 sm:w-1/2 flex items-center justify-center'>
        <img
          className="w-full h-auto object-cover sm:w-[70rem]"
          src={assets.image}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
