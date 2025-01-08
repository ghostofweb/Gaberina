import React, { createContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 150;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cartItems, setCartItems] = useState({});
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetch cart from DB if logged in, else from localStorage
  useEffect(() => {
    if (token) {
      fetchCartFromDB();
    } else {
      const savedCart = JSON.parse(localStorage.getItem("guestCart")) || {};
      setCartItems(savedCart);
    }
  }, [token]);

  // Update the total whenever the cart items change
  useEffect(() => {
    setTotal(calculateTotal(cartItems));
  }, [cartItems]);

  // Get product data on initial load
  useEffect(() => {
    getProductsData();
  }, []);

  // Update cart in localStorage or DB depending on user login status
  useEffect(() => {
    if (token) {
      updateCartInDB(cartItems);
    } else {
      saveCartForGuest(cartItems);
    }
  }, [cartItems, token]);

  const calculateTotal = (cartData) => {
    let subtotal = 0;
    for (const itemId in cartData) {
      for (const size in cartData[itemId]) {
        const product = products.find((prod) => prod._id === itemId);
        if (product && product.price[size]) {
          subtotal += product.price[size] * cartData[itemId][size];
        }
      }
    }
    return subtotal + delivery_fee;
  };

  const fetchCartFromDB = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    }
  };

  const updateCartInDB = async (cartData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { cartData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.data.success) {
        toast.error(response.data.message || "Failed to update cart.");
      }
    } catch (error) {
      console.error("Error updating cart in DB:", error);
      toast.error("Failed to update cart.");
    }
  };

  const saveCartForGuest = (cartData) => {
    localStorage.setItem("guestCart", JSON.stringify(cartData));
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size", {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E", // Dark Charcoal background
          color: "#FDFBF6", // Button text color
          borderLeft: "5px solid #BFA253", // Champagne accent color
        },
      });
      return;
    }

    // Clone cart data before modifying
    const cartData = structuredClone(cartItems);
    const product = products.find((prod) => prod._id === itemId);

    // Update cart state with new item
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    // Update state first
    setCartItems(cartData);

    // After state update, handle async actions (DB or localStorage)
    if (token) {
      await updateCartInDB(cartData); // Update cart in DB for logged-in users
    } else {
      saveCartForGuest(cartData); // Save cart to localStorage for guest users
    }

    // Now, show success toast
    toast.success(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={product.image[0]}
          alt={product.name}
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />
        <div>
          <strong>{product.name}</strong>
          <br />
          <span>Size: {size}</span>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          fontFamily: "Lato, sans-serif",
          border: "1px solid #D4AF37CC",
          borderRadius: "8px",
          padding: "10px",
        },
        icon: "🛒",
      }
    );
    console.log(cartData);
  };

  const removeFromCart = async (itemId, size) => {
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

    if (token) {
      await updateCartInDB(cartData);
    } else {
      saveCartForGuest(cartData);
    }

    toast.success("Item removed from cart", {
      position: "top-right",
      className: "custom-toast",
      style: {
        backgroundColor: "#1E1E1E",
        color: "#FDFBF6",
      },
    });
  };

  const clearCart = async () => {
    setCartItems({});
    if (token) {
      await updateCartInDB({});
    } else {
      saveCartForGuest({});
    }

    toast.success("Cart cleared", {
      position: "top-right",
      className: "custom-toast",
      style: {
        backgroundColor: "#1E1E1E",
        color: "#FDFBF6",
      },
    });
  };

  const cartCount = useMemo(() => {
    return Object.values(cartItems).reduce(
      (total, itemSizes) =>
        total + Object.values(itemSizes).reduce((sizeTotal, count) => sizeTotal + count, 0),
      0
    );
  }, [cartItems]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

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
    total,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
