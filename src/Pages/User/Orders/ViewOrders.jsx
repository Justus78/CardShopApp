import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/User/Footer";
import LoadingOverlay from "../../../Components/LoadingSpinners/LoadingOverlay";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <LoadingOverlay />
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">You have no orders yet</h2>
          <button
            onClick={() => navigate("/user/viewProducts")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Shop Now
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg bg-white/70 shadow p-6"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <h2 className="text-xl font-semibold">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "Failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </div>

              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-gray-700"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                    </span>
                    <span>
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">
                  Total: ${order.totalAmount.toFixed(2)}
                </span>
                <button
                  onClick={() => navigate(`/order-success/${order.id}`)}
                  className="text-indigo-600 hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewOrders;
