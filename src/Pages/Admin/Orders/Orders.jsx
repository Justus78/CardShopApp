import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Admin/Navbar';
import { getAllOrdersForAdmin } from '../../../Services/AdminService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await getAllOrdersForAdmin();
        setOrders(res);
      } catch {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <p className="p-4">Loading orders.....</p>
      ) : error ? (
        <p className="text-red-500 p-4">{error}</p>
      ) : orders.length === 0 ? (
        <p className="p-4">No orders found.</p>
      ) : (
        <div className="p-4 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Order ID</th>
                <th className="py-2 px-4 border-b text-left">Customer</th>
                <th className="py-2 px-4 border-b text-left">Total</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.user.userName || order.user.email}</td>
                  <td className="py-2 px-4 border-b">${order.totalAmount}</td>
                  <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
