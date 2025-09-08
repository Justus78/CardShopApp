import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Components/User/Navbar";

const OrderSuccess = () => {
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">Loading order details...</div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Order not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Back Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10 bg-white/70 shadow rounded-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          🎉 Thank you for your purchase!
        </h1>
        <p className="text-lg mb-4">
          Your order <span className="font-semibold">#{order.id}</span> has been successfully placed.
        </p>

        <div className="border-t pt-4 space-y-4">
          {order.items?.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right text-xl font-bold">
          Total: ${order.totalAmount.toFixed(2)}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate("/user/viewProducts")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/user/viewOrders")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            View Orders
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
