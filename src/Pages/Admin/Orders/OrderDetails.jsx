import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/Admin/Navbar';
import { getOrderById, updateOrderStatus } from '../../../Services/AdminService';
import { toast } from 'react-toastify';
import { BackButton, OrderInfo, OrderItemsTable, OrderStatusSelect} from './Components'

const OrderDetailsPage = () => {
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

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await updateOrderStatus(id, newStatus);
      toast.success('Order status updated successfully!');
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  if (loading) return <p className="text-cyan-400 text-center mt-10 text-lg">Loading order...</p>;
  if (!order) return <p className="text-red-500 text-center mt-10 text-lg">Order not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0022] to-[#010101] text-white font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 mt-10 bg-opacity-10 bg-black rounded-2xl border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center drop-shadow-[0_0_10px_#00ffff]">
          Order Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <OrderInfo order={order} />
          <OrderStatusSelect status={status} onChange={handleStatusChange} />
        </div>

        <OrderItemsTable items={order.items} />

        <div className="text-center mt-8">
          <BackButton onClick={() => navigate('/admin/viewOrders')} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
