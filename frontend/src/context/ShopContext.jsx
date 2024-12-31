import React, { createContext, useState, useEffect, useMemo } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '₹';
    const delivery_fee = 150;
    const [cartItems, setCartItems] = useState({});
    const [total, setTotal] = useState(0);  // Add total state
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('getItems'));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, []);

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('getItems', JSON.stringify(cartItems));
        // Recalculate total when cartItems change
        setTotal(calculateTotal(cartItems));
    }, [cartItems]);

    const calculateTotal = (cartData) => {
        let subtotal = 0;
        for (const itemId in cartData) {
            for (const size in cartData[itemId]) {
                const product = products.find((prod) => prod.id === itemId);
                if (product && product.price[size]) {
                    subtotal += product.price[size] * cartData[itemId][size];
                }
            }
        }
        return subtotal + delivery_fee; // Include delivery fee in total
    };

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Please select the size', {
                position: 'top-right',
                className: 'custom-toast',
                style: {
                    backgroundColor: '#1E1E1E', // Dark Charcoal background
                    color: '#FDFBF6', // Button text color
                    borderLeft: '5px solid #BFA253', // Champagne accent color
                },
            });
            return;
        }

        const cartData = structuredClone(cartItems);
        const product = products.find((prod) => prod.id === itemId);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);

        toast.success(
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <div>
                    <strong>{product.name}</strong><br />
                    <span>Size: {size}</span>
                </div>
            </div>,
            {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    backgroundColor: '#1E1E1E',
                    color: '#FDFBF6',
                    fontFamily: 'Lato, sans-serif',
                    border: '1px solid #D4AF37CC',
                    borderRadius: '8px',
                    padding: '10px',
                },
                icon: '🛒',
            }
        );
    };

    const removeFromCart = (itemId, size) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] -= 1;
            if (cartData[itemId][size] <= 0) {
                delete cartData[itemId][size];
            }
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
    };

    const clearCart = () => {
        setCartItems({});
    };

    const cartCount = useMemo(() => {
        return Object.values(cartItems).reduce((total, itemSizes) => {
            return total + Object.values(itemSizes).reduce((sizeTotal, count) => sizeTotal + count, 0);
        }, 0);
    }, [cartItems]);

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        total,  // Add total to the context
        search,
        setSearch,
        showSearch,
        setShowSearch,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
