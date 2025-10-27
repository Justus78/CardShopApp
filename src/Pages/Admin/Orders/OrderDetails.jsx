import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Admin/Navbar';
import { getOrderById, updateOrderStatus } from '../../../Services/AdminService';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res);
        setStatus(res.status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    setStatus(newStatus);

    try {
      await updateOrderStatus(id, newStatus);
      toast.success('Order status updated successfully!');
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  if (loading)
    return <p className="text-cyan-400 text-center mt-10 text-lg">Loading order...</p>;
  if (!order)
    return <p className="text-red-500 text-center mt-10 text-lg">Order not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0022] to-[#010101] text-white font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-10 bg-opacity-10 bg-black rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center drop-shadow-[0_0_10px_#00ffff]">
          Order Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <p><span className="text-purple-400 font-semibold">Order ID:</span> {order.id}</p>
            <p><span className="text-purple-400 font-semibold">Customer:</span> {order.username || "No username found"}</p>
            <p><span className="text-purple-400 font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="space-y-3">
            <p><span className="text-purple-400 font-semibold">Total:</span> ${order.totalAmount}</p>
            <div>
              <label className="text-purple-400 font-semibold mr-2">Status:</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="bg-black border border-cyan-500 text-cyan-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value={0}>Pending</option>
                <option value={1}>Paid</option>
                <option value={2}>Failed</option>
                <option value={3}>Shipped</option>
                <option value={4}>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <h3 className="text-2xl text-cyan-400 mb-4 font-semibold border-b border-cyan-500/30 pb-2">
          Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-cyan-600/40">
            <thead className="bg-[#0f002a] text-cyan-300">
              <tr>
                <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Product</th>
                <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Qty</th>
                <th className="py-3 px-4 border-b border-cyan-600/40 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item) => (
                <tr
                  key={item.productId}
                  className="hover:bg-[#0a0022] transition duration-300"
                >
                  <td className="py-3 px-4 border-b border-cyan-600/40">{item.productName}</td>
                  <td className="py-3 px-4 border-b border-cyan-600/40">{item.quantity}</td>
                  <td className="py-3 px-4 border-b border-cyan-600/40">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/admin/viewOrders')}
            className="px-6 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-[0_0_15px_#00ffff] transition duration-300"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
