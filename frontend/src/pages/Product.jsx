import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Title from '../components/Title';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null); // Initially no size selected
  const [priceTransition, setPriceTransition] = useState(false); // Used for triggering the animation

  const fetchProduct = async () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  const handleSizeChange = (size) => {
    setPriceTransition(false); // Reset animation state
    setSelectedSize(size); // Update the selected size
    setPriceTransition(true); // Trigger price change animation
  };

  // If productData is not available, show loading
  if (!productData) {
    return <div className="opacity-0">Loading...</div>;
  }

  // Determine the price to display
  const defaultSize = "50ml"; // Default size for showing price
  const price = selectedSize 
    ? productData.price[selectedSize] 
    : productData.price[defaultSize]; // Show price for defaultSize if no size selected

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:justify-normal sm:w-[10.7%] w-full overflow-hidden">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border ${
                  image === img ? 'border-champagne' : ''
                }`}
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ----- Product Info ---- */}
        <div className="flex-1">
          <h2 className="font-bold text-3xl font-times text-gold">{productData.name}</h2>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2 text-buttontxt">(122)</p>
          </div>

          {/* Price with Transition */}
          <p
            className={`mt-5 text-gold text-3xl font-medium transition-all duration-300 ease-in-out transform ${
              priceTransition ? 'animate-price' : ''
            }`}>
            {currency}{price}/<span className="text-xs text-buttontxt">{selectedSize || defaultSize}</span>
          </p>

          <p className="mt-5 text-buttontxt">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-buttontxt font-bold">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`border bg-lighterDark p-2 text-buttontxt ${
                    selectedSize === size ? 'border-champagne font-semibold' : ''
                  }`}
                  onClick={() => handleSizeChange(size)}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addToCart(productData.id, selectedSize)} 
            className={`bg-buttonhvr text-buttontxt active:bg-champagne px-8 py-3 font-bold ${
              !selectedSize ? 'opacity-50' : ''
            }`}>
            Add to Cart
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-buttontxt mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash on delivery is available on this Product</p>
              <p>Easy Return and Exchange Policy within 7 Days</p>
          </div>
        </div>
      </div>
      {/* --------- Description------- review-------*/}
      <div className='mt-20'>
          <div className='flex'>
              <b className='border px-5 py-3 text-sm text-buttontxt bg-lighterDark'>Description</b>
            <p className='border px-5 py-3 text-sm text-buttontxt'>Review (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-buttontxt mt-5 bg-lighterDark'>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris egestas quam, sit amet cursus leo neque in erat. Fusce risus nisl, bibendum sit amet lacinia vitae, sollicitudin sit amet augue. Phasellus arcu turpis, congue a condimentum in, semper eget nisi. Donec in nisi pharetra sapien aliquet ultrices in sit amet erat. Nulla nibh mi, congue sit amet elementum ut, egestas et diam. Duis cras amet.
              </p>
              <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris egestas quam, sit amet cursus leo neque in erat. Fusce risus nisl, bibendum sit amet lacinia vitae, sollicitudin sit amet augue. Phasellus arcu turpis, congue a condimentum in, semper eget nisi. Donec in nisi pharetra sapien aliquet ultrices in sit amet erat. Nulla nibh mi, congue sit amet elementum ut, egestas et diam. Duis cras amet.
              </p>
          </div>
      </div>
      {/* -------------- Display related Product ----------- */}
      <div className='text-center py-8 text-3xl'>
      <Title text1={"RELATED"} text2={"PRODUCTS"}/>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};


export default Product;
