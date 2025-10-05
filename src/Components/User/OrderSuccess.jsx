import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/User/Navbar";

const OrderSuccessPage = () => {
  const { id } = useParams(); // order id or paymentIntent id
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


    console.log("order id: ", id)


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://localhost:7286/api/orders/${id}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to load order");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Order not found</h1>
        <p className="text-gray-600 mb-6">We couldn’t find the details for this order.</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Return Home
        </Link>
      </div>
      </>
    );
  }

  return (
    <>
     <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We’ve received your payment and your items are being processed.
          </p>

          {/* Order summary */}
          <div className="bg-gray-50 border rounded-lg p-6 text-left mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.productId} className="py-2 flex justify-between">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold text-gray-800">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </Link>
            <Link
              to={`/orders/${order.id}`}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
            >
              View Order
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
