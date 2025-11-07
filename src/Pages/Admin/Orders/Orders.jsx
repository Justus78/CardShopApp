import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../../Components/Admin/Navbar';
import { getAllOrdersForAdmin } from '../../../Services/AdminService';
import { useNavigate } from 'react-router-dom';
import OrderTable from './Components/OrderTable';

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
    <>
      <Navbar />

      { /* styles for the background of the page */}
      <div className="min-h-screen bg-gradient-to-br from-[#0a0024] via-[#10002b] to-[#001f2d] text-white relative overflow-hidden">        

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

              <OrderTable orders={orders}/>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};


export default Orders;
