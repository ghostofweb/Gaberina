import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import RelatedProducts from '../components/RelatedProducts';
import 'react-toastify/dist/ReactToastify.css'
const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItems, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceTransition, setPriceTransition] = useState(false);

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds smooth scroll effect
    });
  }, [productId, products]);

  const handleSizeChange = (size) => {
    setPriceTransition(false);
    setSelectedSize(size);
    setPriceTransition(true);
  };

  if (!productData) {
    return <div className="opacity-0">Loading...</div>;
  }

  const defaultSize = "50ml";
  const price = selectedSize 
    ? productData.price[selectedSize] 
    : productData.price[defaultSize];

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(productData._id, selectedSize);
    }
    
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
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

          <p
            className={`mt-5 text-gold text-3xl font-medium transition-all duration-300 ease-in-out transform ${
              priceTransition ? 'animate-price' : ''
            }`}
          >
            {currency}{price}/<span className="text-xs text-buttontxt">{selectedSize || defaultSize}</span>
          </p>

          <p className="mt-5 text-buttontxt">{productData.description}</p>

          {/* Fragrance Notes */}
          <div className="mt-5">
            <p className="text-gold font-bold text-lg">Fragrance Notes:</p>
            <ul className="flex flex-wrap gap-4 mt-3">
              {productData.fragranceNotes.map((note, index) => (
                <li
                  key={index}
                  className="bg-lighterDark text-gold px-4 py-2 rounded-lg shadow-md border hover:border-champagne hover:text-champagne transition-colors ease-in-out duration-300"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <p className="text-buttontxt font-bold">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`border bg-lighterDark p-2 text-buttontxt ${
                    selectedSize === size ? 'border-champagne font-semibold' : ''
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`bg-buttonhvr text-buttontxt active:bg-champagne px-8 py-3 font-bold ${
              !selectedSize ? 'opacity-50' : ''
            }`}
          >
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-buttontxt mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this Product</p>
            <p>Easy Return and Exchange Policy within 7 Days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm text-buttontxt bg-lighterDark">Description</b>
          <p className="border px-5 py-3 text-sm text-buttontxt">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-buttontxt mt-5 bg-lighterDark">
        <p>
    Indulge in the luxurious essence of Gaberina, where every fragrance is crafted to embody the divine. Each scent is a harmonious blend of rare notes, designed to evoke a sense of elegance and allure. Whether you're looking for a scent to elevate your everyday moments or one to accompany you on special occasions, Gaberina offers an exquisite collection tailored to your every desire.
</p>
<p>
    At Gaberina, we believe that fragrance is not just a scent, but an experience. Our perfumes are more than just a blend of notes—they are a journey into a world of timeless beauty and luxury. From the first spritz to the lingering trail, each perfume is carefully crafted to make every moment unforgettable. Discover your signature scent today and let Gaberina become a part of your story.
</p>

        </div>
      </div>

      {/* Cart Items Section (To display cart items that are already added) */}
      <div className='py-6'>
      <Title text1={"RELATED"} text2={'PRODUCT'}/>
      <RelatedProducts category={productData.category}/>
      </div>
    </div>
  );
};

export default Product;
