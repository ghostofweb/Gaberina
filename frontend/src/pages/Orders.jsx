import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        toast.error('You must be logged in to view your orders.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = new Date(order.date).toLocaleString(); // Format the date
            allOrdersItem.push(item);
          });
        });
        setOrdersData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error(error.response?.data?.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-12 bg-[#1E1E1E] text-[#FFF8E7]">
      <div className="text-3xl font-bold mb-8 text-center">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {loading ? (
        <div className="text-center text-lg text-[#CFC4B9]">Loading...</div>
      ) : ordersData.length === 0 ? (
        <div className="text-center text-lg text-[#CFC4B9]">
          You have not placed any orders yet. <Link to="/collection" className="text-[#D4AF37] underline">Place an order</Link> to view it here.
        </div>
      ) : (
        <div>
          {ordersData.map((item, index) => {
            const selectedSize = item.size || "50ml"; // Default to "50ml" if size is not found
            const price = item.price[selectedSize]; // Dynamically get the price based on selected size
            return (
              <div
                key={index}
                className="py-6 border-t border-b text-[#FDFBF6] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div className="flex items-start gap-8 text-sm md:text-base">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 sm:w-24 h-24 sm:h-28 object-cover rounded-lg shadow-md"
                    />
                  </Link>
                  <div>
                    <p className="font-medium text-lg">{item.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-lg text-[#CFC4B9]">
                      <p className="text-xl">{currency}{price}</p>
                      <p className="font-semibold">Quantity: {item.quantity}</p>
                      <p className="text-sm">Size: {selectedSize}</p>
                    </div>
                    <p className="mt-2 text-sm text-[#D9D9D9]">
                      Date: <span className="text-gray-400">{item.date}</span>
                    </p>
                    <p className="mt-2 text-sm text-[#D9D9D9]">
                      Payment:{' '}
                      <span className="text-gray-400">
                        {item.paymentMethod === 'COD' ? 'Cash On Delivery' : item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
