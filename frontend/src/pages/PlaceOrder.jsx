import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import GooglePayLogo from "../assets/google-pay-logo.svg";
import PaytmLogo from "../assets/paytm-logo.svg";
import CODLogo from "../assets/cash-on-delivery.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { products, currency } = useContext(ShopContext);
  const navigate = useNavigate(); // For programmatic navigation
  const [selectedPayment, setSelectedPayment] = useState(""); // State to track the selected payment method

  const savedCart = JSON.parse(localStorage.getItem("getItems")) || {};
  const handlePlaceOrder = () => {
    if (!savedCart){
    toast.error('Please add Something In Cart', {
    position: 'top-right',
    className: 'custom-toast',
    style: {
        backgroundColor: '#1E1E1E', // Dark Charcoal background
        color: '#FDFBF6', // Button text color
        borderLeft: '5px solid #BFA253', // Champagne accent color
          },
    });
    return
    }

    if(!selectedPayment){
      toast.error('Please select a payment method', {
        position: 'top-right',
        className: 'custom-toast',
        style: {
          backgroundColor: '#1E1E1E', // Dark Charcoal background
          color: '#FDFBF6', // Button text color
          borderLeft: '5px solid #BFA253', // Champagne accent color
          },
          });
          return
    }
   navigate("/orders")
  };
  
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const itemId in savedCart) {
      for (const size in savedCart[itemId]) {
        const product = products.find((prod) => prod.id === itemId);
        if (product && product.price[size]) {
          subtotal += product.price[size] * savedCart[itemId][size];
        }
      }
    }
    return subtotal;
  };

  const calculateShipping = () => 150; // Fixed shipping cost

  const calculateTotal = () => calculateSubtotal() + calculateShipping();

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side: Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="text"
          placeholder="Email Id"
        />
        <input
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-3">
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border bg-lighterDark hover:border-buttontxt transition-colors ease-in-out duration-200 text-buttontxt border-champagne rounded-md p-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side: Cart Summary */}
      <div className="flex flex-col gap-6">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="CART" text2="SUMMARY" />
        </div>
        <div className="space-y-6">
          {Object.keys(savedCart).length === 0 ? (
            <p className="text-center text-lg text-[#D9D9D9]">Your cart is empty.</p>
          ) : (
            Object.keys(savedCart).map((itemId) => {
              const product = products.find((prod) => prod.id === itemId);
              if (!product) return null;
              return Object.keys(savedCart[itemId]).map((size) => {
                const quantity = savedCart[itemId][size];
                const price = product.price[size];
                return (
                  <div key={`${itemId}-${size}`} className="flex justify-between">
                    <div>
                      <p className="text-sm text-[#FFF8E7]">
                        {product.name} (Size: {size})
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
    {[
      { id: "google-pay", name: "Google Pay", logo: GooglePayLogo },
      { id: "paytm", name: "Paytm", logo: PaytmLogo },
      { id: "cod", name: "Cash on Delivery", logo: CODLogo },
    ].map(({ id, name, logo }) => (
      <button
        key={id}
        onClick={() => handlePaymentSelection(id)}
        className={`payment-button flex items-center gap-2 ${
          selectedPayment === id ? "border-buttontxt" : "border-champagne"
        }`}
      >
        <span
          className={`w-3 h-3 rounded-full ${
            selectedPayment === id
              ? "bg-green-500"
              : "bg-transparent border border-champagne"
          }`}
        ></span>
        <img src={logo} alt={name} className="w-20" />
      </button>
    ))}
  </div>

  {/* Place Order Button */}
  <div className="mt-6 flex justify-center">
    <button
      onClick={handlePlaceOrder}
      className={`py-2 px-6 rounded-md font-medium transition-colors ease-in-out duration-200 ${
        selectedPayment
          ? "bg-champagne hover:bg-buttonhvr text-buttontxt"
          : "bg-gray-500 text-gray-300"
      }`}
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
