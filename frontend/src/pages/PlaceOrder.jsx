import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import GooglePayLogo from "../assets/google-pay-logo.svg";
import PaytmLogo from "../assets/paytm-logo.svg";
import CODLogo from "../assets/cash-on-delivery.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { cartItems, currency, products, backendUrl, token, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      toast.error("Please Log In to Make Order", {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          borderLeft: "5px solid #BFA253",
        },
      });
      return;
    }
    if (Object.keys(cartItems).length === 0) {
      toast.error("Please add something to the cart", {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          borderLeft: "5px solid #BFA253",
        },
      });
      return;
    }

    if (!selectedPayment) {
      toast.error("Please select a payment method", {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          borderLeft: "5px solid #BFA253",
        },
      });
      return;
    }

    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("Please fill all fields", {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          borderLeft: "5px solid #BFA253",
        },
      });
      return;
    }

    // Log products with quantity
    const orderItem = Object.keys(cartItems).flatMap((itemId) => {
      const cartItem = cartItems[itemId];
      return Object.keys(cartItem).map((size) => {
        const product = products.find((prod) => prod._id === itemId);
        return {
          ...product,
          quantity: cartItem[size],
          size,
        };
      });
    });

    let orderData = {
      address: formData,
      items: orderItem,
      amount: calculateTotal(),
    }

    // Handle different payment methods
    if (selectedPayment === 'google-pay' || selectedPayment === 'paytm') {
      toast.info(`Payment transaction via ${selectedPayment === 'google-pay' ? 'Google Pay' : 'Paytm'} is not available for demo`, {
        position: "top-right",
        className: "custom-toast",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#FDFBF6",
          borderLeft: "5px solid #BFA253",
        },
      });
      return;
    }

    // Process COD order
    if (selectedPayment === 'cod') {
      try {
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data.success) {
          setCartItems({});
          toast.success("Order placed successfully", {
            position: "top-right",
            className: "custom-toast",
            style: {
              backgroundColor: "#1E1E1E",
              color: "#FDFBF6",
              borderLeft: "5px solid #BFA253",
            },
          });
          navigate('/orders');
        } else {
          toast.error("Failed to place order", {
            position: "top-right",
            className: "custom-toast",
            style: {
              backgroundColor: "#1E1E1E",
              color: "#FDFBF6",
              borderLeft: "5px solid #BFA253",
            },
          });
        }
      } catch (error) {
        toast.error("Error placing order", {
          position: "top-right",
          className: "custom-toast",
          style: {
            backgroundColor: "#1E1E1E",
            color: "#FDFBF6",
            borderLeft: "5px solid #BFA253",
          },
        });
      }
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        const product = products.find((prod) => prod._id === itemId);
        if (product && product.price[size]) {
          subtotal += product.price[size] * quantity;
        }
      }
    }
    return subtotal;
  };

  const handlePaymentSelection = (id)=>{
    setSelectedPayment(id)
  }
  const calculateShipping = () => 150;

  const calculateTotal = () => calculateSubtotal() + calculateShipping();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="text"
          placeholder="Email Id"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="CART" text2="SUMMARY" />
        </div>
        <div className="space-y-6">
          {Object.keys(cartItems).length === 0 ? (
            <p className="text-center text-lg text-[#D9D9D9]">Your cart is empty.</p>
          ) : (
            Object.keys(cartItems).map((itemId) => {
              const cartItem = cartItems[itemId];
              return Object.keys(cartItem).map((size) => {
                const quantity = cartItem[size];
                const product = products.find((prod) => prod._id === itemId);
                const price = product && product.price[size];
                return (
                  <div key={`${itemId}-${size}`} className="flex justify-between">
                    <div>
                      <p className="text-sm text-[#FFF8E7]">
                        {product?.name} (Size: {size})
                      </p>
                      <p className="text-sm text-[#D9D9D9]">
                        Price: {currency}{price} x {quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-[#FFF8E7]">
                      {currency}{price * quantity}
                    </p>
                  </div>
                );
              });
            })
          )}
        </div>
        <div className="mt-6 pt-6 border-t border-[#D9D9D9]">
          <div className="flex justify-between text-lg font-medium text-[#D9D9D9]">
            <span>Subtotal:</span>
            <span>{currency}{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between text-lg font-medium text-[#D9D9D9]">
            <span>Shipping:</span>
            <span>{currency}{calculateShipping()}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold text-[#D9D9D9]">
            <span>Total:</span>
            <span>{currency}{calculateTotal()}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-8">
          <Title text1="PAYMENT" text2="OPTIONS" />
          <div className="flex gap-4 justify-between mt-4">
            {[{ id: "google-pay", name: "Google Pay", logo: GooglePayLogo },
              { id: "paytm", name: "Paytm", logo: PaytmLogo },
              { id: "cod", name: "Cash on Delivery", logo: CODLogo }].map(({ id, name, logo }) => (
              <button
                key={id}
                onClick={() => handlePaymentSelection(id)}
                className={`payment-button flex items-center gap-2 ${selectedPayment === id ? "border-buttontxt" : "border-champagne"}`}
              >
                <span className={`w-3 h-3 rounded-full ${selectedPayment === id ? "bg-green-500" : "bg-transparent border border-champagne"}`}></span>
                <img src={logo} alt={name} className="w-20" />
              </button>
            ))}
          </div>

          {/* Place Order Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handlePlaceOrder}
              className={`py-2 px-6 rounded-md font-medium transition-colors ease-in-out duration-200 ${selectedPayment ? "bg-champagne hover:bg-buttonhvr text-buttontxt" : "bg-gray-500 text-gray-300"}`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
