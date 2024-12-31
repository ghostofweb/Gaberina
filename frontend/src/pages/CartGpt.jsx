import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const { products, currency } = useContext(ShopContext);
    const [cartData, setCartData] = useState({});

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('getItems')) || {};
        setCartData(savedCart);
    }, []);

    // Save cart to localStorage whenever it changes
    const saveCartData = (updatedCart) => {
        setCartData(updatedCart);
        localStorage.setItem('getItems', JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId, size) => {
        let updatedCart = { ...cartData };
        if (updatedCart[itemId] && updatedCart[itemId][size]) {
            delete updatedCart[itemId][size]; // Remove specific size
            if (Object.keys(updatedCart[itemId]).length === 0) {
                delete updatedCart[itemId]; // Remove item if no sizes left
            }
        }
        saveCartData(updatedCart);
    };

    const updateQuantity = (itemId, size, increment) => {
        let updatedCart = { ...cartData };
        if (updatedCart[itemId] && updatedCart[itemId][size]) {
            updatedCart[itemId][size] += increment;

            // If quantity is 0 or less, remove the item
            if (updatedCart[itemId][size] <= 0) {
                delete updatedCart[itemId][size];
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId];
                }
            }
        }
        saveCartData(updatedCart);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (const itemId in cartData) {
            for (const size in cartData[itemId]) {
                const product = products.find((prod) => prod.id === itemId);
                if (product && product.price[size]) {
                    total += product.price[size] * cartData[itemId][size];
                }
            }
        }
        return total;
    };

    return (
        <div className="bg-[#1E1E1E] text-[#FFF8E7] p-6 rounded-lg">
            <h2 className="text-2xl mb-6">Your Cart</h2>
            {Object.keys(cartData).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {Object.keys(cartData).map((itemId) => {
                        const product = products.find((prod) => prod.id === itemId);
                        if (!product) return null;
                        return Object.keys(cartData[itemId]).map((size) => {
                            const quantity = cartData[itemId][size];
                            const price = product.price[size];
                            return (
                                <div key={`${itemId}-${size}`} className="flex bg-[#2A2A2A] p-4 rounded-lg">
                                    <img src={product.image[0]} alt={product.name} className="w-20 h-20 rounded-lg mr-4" />
                                    <div className="flex-1">
                                        <h3 className="text-xl mb-2">{product.name}</h3>
                                        <p className="text-[#D9D9D9] text-sm">Size: {size}</p>
                                        <p className="text-[#D9D9D9] text-sm">Price: {currency}{price}</p>
                                        <p className="text-[#D9D9D9] text-sm">Quantity: {quantity}</p>
                                        <p className="text-[#D9D9D9] text-sm">Total: ₹{price * quantity}</p>
                                    </div>
                                    <div className="flex flex-col justify-between items-end">
                                        <button
                                            onClick={() => updateQuantity(itemId, size, 1)}
                                            className="bg-[#CFC4B9] text-[#FDFBF6] py-1 px-3 rounded-md mb-2 hover:bg-[#D4AF37]">
                                            +
                                        </button>
                                        <button
                                            onClick={() => updateQuantity(itemId, size, -1)}
                                            className="bg-[#CFC4B9] text-[#FDFBF6] py-1 px-3 rounded-md mb-2 hover:bg-[#D4AF37]">
                                            -
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(itemId, size)}
                                            className="bg-[#B76E79] text-[#FDFBF6] py-1 px-3 rounded-md hover:bg-[#D19E9E]">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        });
                    })}
                </div>
            )}
            <div className="mt-8 pt-6 border-t border-[#D9D9D9]">
                <h3 className="text-xl">Total: ₹{calculateTotalPrice()}</h3>
                <button
                    className="bg-[#CFC4B9] text-[#FDFBF6] py-3 px-6 mt-4 rounded-md hover:bg-[#D4AF37]">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
