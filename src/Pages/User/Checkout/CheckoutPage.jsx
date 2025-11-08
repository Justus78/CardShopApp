import React, { useState } from "react";
import { useCart } from "../../../Context/CartContext";
import Navbar from "../../../Components/User/Navbar";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../Components/User/CheckoutForm";
import Footer from "../../../Components/User/Footer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { cart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state:"",
    postalCode: "",
    country: "US"
  });
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [orderId, setOrderId] = useState(null); // set the orderId

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const createPaymentIntent = async () => {
  const response = await fetch("https://localhost:7286/api/orders/create-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      shippingInfo
    }),
  });

  const data = await response.json();
  console.log(data.order);
  setClientSecret(data.clientSecret);
  setPaymentIntentId(data.paymentIntentId);
  setOrderId(data.order.id);
};


  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 border border-white mt-3 bg-white/60">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Shipping Info */}
        <div className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={shippingInfo.fullName}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={shippingInfo.postalCode}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded"
          />
         
        </div>

        {/* Order Summary */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <p className="text-lg font-semibold mt-2">
            Total: ${calculateTotal()}
          </p>
        </div>

        {/* Create PaymentIntent */}
        {!clientSecret && (
          <button
            onClick={createPaymentIntent}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Continue to Payment
          </button>
        )}

        {/* Stripe Form */}
        {clientSecret && (
          <div className="mt-8">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                orderId={orderId}
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                cart={cart}
                shippingInfo={shippingInfo}
              />
            </Elements>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
