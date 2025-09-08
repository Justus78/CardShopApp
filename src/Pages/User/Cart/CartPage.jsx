import React, { useState } from "react";
import { useCart } from "../../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/User/Navbar";
import CheckoutForm from "../../../Components/User/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const { cart, loading, removeItem, updateItem, clear } = useCart();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // console.log("Cart contents:", cart);

  const handleCheckout = async () => {
    try {
      // 📝 Log what’s being sent to backend
      console.log("=== Checkout Verification ===");
      cart.forEach((item) => {
        console.log(
          `Product ID: ${item.id}, Name: ${item.productName}, Quantity: ${item.quantity}, Price: ${item.price}`
        );
      });
      console.log("=============================");

      // 🔹 Step 1: Request PaymentIntent from backend
      const response = await fetch(
        "https://localhost:7286/api/checkout/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.id, // use correct ID
              quantity: item.quantity,
              unitPrice: item.price,
              productName: item.productName,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("PaymentIntent response:", data);

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">Loading your cart...</div>
      </>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
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
      <div className="max-w-5xl mx-auto px-4 py-10 border border-white mt-3 bg-white/60">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {/* Cart items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="font-semibold text-lg">{item.productName}</h2>
                  <p className="font-semibold text-lg">{item.set}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-bold text-xl">
                  $<span className="text-green-800">{item.price}</span>
                </p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem({ ...item, quantity: parseInt(e.target.value) })
                  }
                  className="w-16 border rounded-md px-2 py-1 text-center"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-10 border-t pt-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Total: $<span className="text-green-800">{calculateTotal()}</span>
          </h2>
          {!clientSecret ? (
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Checkout
            </button>
          ) : null}
        </div>

        {/* Stripe Form */}
        {clientSecret && (
          <div className="mt-10">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                cart={cart}
              />
            </Elements>
          </div>
        )}

        <div className="mt-4 text-right">
          <button
            onClick={clear}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
