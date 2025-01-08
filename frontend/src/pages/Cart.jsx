import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, setCartItems, token } = useContext(ShopContext);
  const navigate = useNavigate();

  const saveCartData = (updatedCart) => {
    setCartItems(updatedCart);
    // Save to localStorage for guest users
    if (!token) {
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
    }
  };
  
  const removeFromCart = (itemId, size) => {
    let updatedCart = structuredClone(cartItems); // Use structuredClone for deep copy
    if (updatedCart[itemId] && updatedCart[itemId][size]) {
      delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
    }
    saveCartData(updatedCart);
  };

  const updateQuantity = (itemId, size, increment) => {
    let updatedCart = structuredClone(cartItems); // Use structuredClone for deep copy
    if (updatedCart[itemId] && updatedCart[itemId][size]) {
      updatedCart[itemId][size] += increment;

      if (updatedCart[itemId][size] <= 0) {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      }
    }
    saveCartData(updatedCart);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const product = products.find((prod) => prod._id === itemId);
        if (product && product.price[size]) {
          subtotal += product.price[size] * cartItems[itemId][size];
        }
      }
    }
    return subtotal;
  };

  const calculateShipping = () => {
    return 150; // Fixed shipping cost of ₹150
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error('Please Log In to Make Order', {
        position: 'top-right',
        className: 'custom-toast',
        style: {
          backgroundColor: '#1E1E1E',
          color: '#FDFBF6',
          borderLeft: '5px solid #BFA253',
        },
      });
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty. Please select products before checking out.', {
        position: 'top-right',
        className: 'custom-toast',
        style: {
          backgroundColor: '#1E1E1E',
          color: '#CFC4B9',
          borderLeft: '5px solid #BFA253',
        },
      });
      return; // Don't navigate if cart is empty
    }

    navigate('/place-order');
  };

  if (!products || products.length === 0) {
    return <p>Loading products...</p>; // Show loading state if products are not yet loaded
  }

  return (
    <div className="bg-[#1E1E1E] text-[#FFF8E7] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center text-lg text-[#D9D9D9]">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {Object.keys(cartItems).map((itemId) => {
            const product = products.find((prod) => prod._id === itemId);
            if (!product) return null;
            return Object.keys(cartItems[itemId]).map((size) => {
              const quantity = cartItems[itemId][size];
              const price = product?.price?.[size] || 0; // Fallback if price is undefined
              return (
                <div
                  key={`${itemId}-${size}`}
                  className="flex flex-col md:flex-row bg-[#2A2A2A] p-6 rounded-lg shadow-md relative"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full md:w-32 h-32 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-[#D9D9D9] mb-1">Size: {size}</p>
                      <p className="text-sm text-[#D9D9D9] mb-4">Price: {currency}{price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(itemId, size, -1)}
                          className="bg-[#BFA253] text-[#FFF8E7] px-3 py-1 rounded-md shadow hover:bg-[#D4AF37] transition"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-[#FFF8E7] text-[#1E1E1E] rounded-md font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemId, size, 1)}
                          className="bg-[#BFA253] text-[#FFF8E7] px-3 py-1 rounded-md shadow hover:bg-[#D4AF37] transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <p className="text-lg font-medium">Total: ₹{price * quantity}</p>
                  </div>
                  <DeleteIcon
                    onClick={() => removeFromCart(itemId, size)}
                    sx={{
                      color: '#B76E79',
                      cursor: 'pointer',
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      '&:hover': {
                        color: '#D19E9E',
                      },
                    }}
                  />
                </div>
              );
            });
          })}
        </div>
      )}
      <div className="mt-12 pt-8 border-t border-[#D9D9D9]">
        <Title text1="Cart Summary" text2="Details" className="text-4xl" />
        <div className="space-y-4">
          <div className="flex justify-between text-lg font-medium">
            <span>Subtotal:</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>Shipping:</span>
            <span>₹{calculateShipping()}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span>{currency}{calculateTotal()}</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r from-[#D4AF37] to-[#BFA253] text-[#FFF8E7] py-3 px-8 mt-6 rounded-lg shadow-lg hover:from-[#E1B866] hover:to-[#CBA55F] transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
