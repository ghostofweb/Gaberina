import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("You must be logged in to view your orders");
      return null;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`,{orderId,status:event.target.value},{
        headers: {
          'Authorization': `Bearer ${token}`,
          },
      })
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders()
        } else {
          toast.error(response.data.message);
          }

    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");

    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] p-6">
      <h3 className="text-3xl font-semibold text-[#CFC4B9] mb-8 text-center">
        Your Orders
      </h3>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex-shrink-0">
                  <div className="w-full h-full bg-[#CFC4B9] rounded-lg flex items-center justify-center">
                    <span className="text-[#1E1E1E] text-2xl">📦</span>
                  </div>
                </div>

                <div className="flex-grow">
                  {/* Order Items */}
                  <div className="space-y-2 mb-4">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <p key={idx} className="text-[#FFF8E7]">
                          {item.name} x {item.quantity}
                          {item.size && (
                            <span className="ml-2 text-[#BFA253]">
                              ({item.size})
                            </span>
                          )}
                        </p>
                      ))
                    ) : (
                      <p className="text-[#FFF8E7]">No items found.</p>
                    )}
                  </div>

                  {/* Customer Details */}
                  <div className="text-[#D9D9D9] mb-4">
                    <p className="text-lg font-medium text-[#CFC4B9] mb-2">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.zipcode}
                    </p>
                    <p className="text-gold">{order.address.phone}</p>
                  </div>

                  {/* Order Meta Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gold">Items</p>
                      <p className="text-[#FFF8E7]">{order.items.length}</p>
                    </div>
                    <div>
                      <p className="text-gold">Method</p>
                      <p className="text-[#FFF8E7]">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gold">Payment</p>
                      <p className="text-[#FFF8E7]">
                        {order.payment ? "Completed" : "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#D19E9E]">Date</p>
                      <p className="text-[#FFF8E7]">{formatDate(order.date)}</p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="mt-4 flex justify-between items-center">
                    <select
                      className="bg-[#2A2A2A] text-[#FFF8E7] border border-[#6A4E42] rounded-md p-2 focus:outline-none focus:border-[#CFC4B9]"
                      value={order.status}
                      onChange={(event) => statusHandler(event,order._id)}
                    >
                      <option value="Order">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Deliverd">Delivered</option>
                    </select>
                    <p className="text-[#CFC4B9]">
                      Total: {currency}
                      {order.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#FFF8E7]">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
