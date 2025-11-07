import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OrderTable = ({ orders }) => {

  const navigate = useNavigate();

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

  return (
    <>
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
                    {console.log(order.createdAt)}
                    <td className="py-3 px-4 font-mono text-cyan-300">{order.id}</td>
                    <td className="py-3 px-4">{order.username || "No username"}</td>
                    <td className="py-3 px-4 text-green-300 font-semibold">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
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
    </>
  )
}

export default OrderTable