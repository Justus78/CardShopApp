import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Services/CartService";

const CheckoutForm = ({ clientSecret, paymentIntentId, cart, shippingInfo, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

  if (!stripe || !elements) return;

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: shippingInfo.fullName,
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          postal_code: shippingInfo.postalCode,
          country: shippingInfo.country,
        },
      },
    },
  });

  setLoading(false);

  if (error) {
    console.error("Payment failed:", error.message);
    setErrorMessage(error.message)
    // show error to user
  } else if (paymentIntent.status === "succeeded") {
    console.log("✅ Payment successful:", paymentIntent.id);

    // clear the user's cart
    clearCart();

    // redirect to Thank You page or show success message
    navigate(`/order-success/${orderId}`);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="p-4 border rounded-md bg-white" />
      {errorMessage && (
        <p className="text-red-600 font-medium">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
