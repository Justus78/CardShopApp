import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, paymentIntentId, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if(cart)
    console.log(cart)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    // Step 1: Confirm payment with Stripe
    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Stripe error:", error);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      console.log("✅ Payment confirmed:", paymentIntent);


      try {
        // Step 2: Save order in backend
        const response = await fetch(
          "https://localhost:7286/api/checkout/confirm-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              transactionId: paymentIntent.id,
              items: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.price,
                productName: item.productName,
              })),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to confirm order. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Order saved:", data);

        setSuccessMessage("Payment successful and order created!");
      } catch (err) {
        console.error("Order save error:", err);
        setErrorMessage("Payment succeeded but order could not be saved.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-md bg-white shadow">
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <CardElement className="p-2 border rounded-md" />
      </div>

      {errorMessage && (
        <div className="text-red-600 font-semibold">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
