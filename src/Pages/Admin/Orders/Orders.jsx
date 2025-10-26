import React, { useEffect, useState } from 'react';
import Navbar from '../../../Components/Admin/Navbar';
import { getAllOrdersForAdmin } from '../../../Services/AdminService';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  const navigate = useNavigate();

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

  // Map status numbers to readable text and colors
  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return <span className="text-yellow-600 font-semibold">Pending</span>;
      case 1: return <span className="text-blue-600 font-semibold">Paid</span>;
      case 2: return <span className="text-indigo-600 font-semibold">Failed</span>;
      case 3: return <span className="text-green-600 font-semibold">Shipped</span>;
      case 4: return <span className="text-red-600 font-semibold">Cancelled</span>;
      default: return <span className="text-gray-600 font-semibold">Unknown</span>;
    }
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <p className="p-4">Loading orders...</p>
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
                <tr key={order.id} className="hover:bg-gray-50 relative">
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.user.userName || order.user.email}</td>
                  <td className="py-2 px-4 border-b">${order.totalAmount}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {getStatusLabel(order.status)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      View / Edit
                    </button>

                    
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
