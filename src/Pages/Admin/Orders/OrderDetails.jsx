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
      alert('Order status updated successfully!');
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  if (loading) return <p className="p-4">Loading order...</p>;
  if (!order) return <p className="p-4 text-red-500">Order not found.</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        <div className="mb-4">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.user.userName || order.user.email}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Total:</strong> ${order.totalAmount}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold mr-2">Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value={0}>Pending</option>
            <option value={1}>Processing</option>
            <option value={2}>Shipped</option>
            <option value={3}>Completed</option>
            <option value={4}>Cancelled</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Items</h3>
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Qty</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.productName}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => navigate('/admin/orders')}
          className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
