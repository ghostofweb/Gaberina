import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '₹';
    const delivery_fee = 150;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    // Load cart items from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('getItems'));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, []);

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        if (cartItems && Object.keys(cartItems).length > 0) {
            localStorage.setItem('getItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            // Display toast notification if size is not selected
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

        // Add item to the cart
        let cartData = structuredClone(cartItems);
        const product = products.find((prod) => prod.id === itemId);

        console.log("Product to add:", product); // Log product info
        console.log("Selected Size:", size); // Log the selected size

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        console.log("Updated Cart Data:", cartData); // Log the updated cart

        setCartItems(cartData);

        // Display success toast with product info
        toast.success(
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={product.image[0]} // Access the first image from the imported array variable
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
                    backgroundColor: '#1E1E1E', // Dark Charcoal background
                    color: '#FDFBF6', // Ivory White color for text
                    fontFamily: 'Lato, sans-serif',
                    border: '1px solid #D4AF37CC', // Button Hover Gold for the border
                    borderRadius: '8px',
                    padding: '10px',
                },
                icon: '🛒', // Custom icon for success
            }
        );
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating total count:", error);
                }
            }
        }
        return totalCount;
    };

    const value = {
        products: products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        setCartItems,
        getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
