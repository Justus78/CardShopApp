import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../../Components/Admin/Navbar';
import { getAllOrdersForAdmin } from '../../../Services/AdminService';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>;
      case 1:
        return <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs font-semibold">Paid</span>;
      case 2:
        return <span className="bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded-full text-xs font-semibold">Failed</span>;
      case 3:
        return <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-semibold">Shipped</span>;
      case 4:
        return <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
      default:
        return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs font-semibold">Unknown</span>;
    }
  };

  // Framer Motion animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Page entrance animation
  const pageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0024] via-[#10002b] to-[#001f2d] text-white relative overflow-hidden">
      <Navbar />

      {/* Neon grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Page content animation */}
      <motion.div
        className="relative z-10 p-6"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-400"></div>
          </div>
        ) : error ? (
          <p className="text-red-400 p-4 text-center">{error}</p>
        ) : orders.length === 0 ? (
          <p className="p-4 text-gray-400 text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] border border-cyan-600/40 backdrop-blur-xl bg-[#0f022c]/70">
            <div className="p-6 flex justify-between items-center border-b border-cyan-500/30">
              <h2 className="text-3xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_#0ff]">
                ⚡ Orders Dashboard
              </h2>
            </div>

            <table className="min-w-full text-sm text-cyan-100">
              <thead className="bg-gradient-to-r from-[#1a0033] to-[#002a3f] border-b border-cyan-500/40 text-cyan-300 uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>

              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {orders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    variants={rowVariants}
                    className={`transition-all duration-300 ${
                      i % 2 === 0 ? 'bg-[#090022]/40' : 'bg-[#0d0130]/40'
                    } hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-gradient-to-r hover:from-cyan-700/20 hover:to-fuchsia-700/20`}
                  >
                    <td className="py-3 px-4 font-mono text-cyan-300">{order.id}</td>
                    <td className="py-3 px-4">{order.username || "No username"}</td>
                    <td className="py-3 px-4 text-green-300 font-semibold">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{getStatusLabel(order.status)}</td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1, textShadow: '0 0 8px #0ff' }}
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                        className="relative inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-fuchsia-400 transition-all duration-300 group"
                      >
                        <span className="z-10">View / Edit</span>
                        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"></span>
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>

            <div className="p-3 bg-[#100030]/80 border-t border-cyan-500/30 text-cyan-400 text-xs text-right rounded-b-2xl">
              Showing {orders.length} orders
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
