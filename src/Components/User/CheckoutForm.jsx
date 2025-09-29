import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, paymentIntentId, cart, shippingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
  e.preventDefault();

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

  if (error) {
    console.error("Payment failed:", error.message);
    // show error to user
  } else if (paymentIntent.status === "succeeded") {
    console.log("✅ Payment successful:", paymentIntent.id);
    // redirect to Thank You page or show success message
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="p-4 border rounded-md bg-white" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition w-full"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
