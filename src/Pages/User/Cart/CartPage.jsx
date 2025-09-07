import React from "react";
import { useCart } from "../../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from '../../../Components/User/Navbar'

const CartPage = () => {
  const { cart, loading, removeItem, updateItem, clear } = useCart();
  const navigate = useNavigate();

  console.log(cart)


  if (loading) {
    return (
    <>
      <Navbar />
        <div className="text-center py-10">Loading your cart...</div>
    </>
    )
  }

  

  // handle checkout for stripe
  const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("access_token"); // JWT from login

    // Build CreateOrderDto to match backend
  const orderDto = {
    items: cart.map(item => ({
      productId: item.id,           // matches OrderItemDto.ProductId
      productName: item.productName, // optional, but you have it
      imageUrl: item.imageUrl ?? null, // if you store it in cart
      quantity: item.quantity,
      unitPrice: item.price         // this is your per-unit price
    })),
    paymentProvider: "Stripe", // required by your DTO
    transactionId: null        // backend fills after payment
  };

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/checkout/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(orderDto)
  });

  if (!res.ok) {
    throw new Error("Failed to create payment");
  }

  const data = await res.json(); 
  // should be StripePaymentResultDto -> contains clientSecret + maybe orderId

  navigate("/checkout", { state: { clientSecret: data.clientSecret, orderId: data.orderId } });
  } catch (err) {
      console.error(err);
      alert("Checkout failed: " + err.message);
    }
  };



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

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 border border-white mt-3 bg-white/60">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                {/* <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-20 h-28 object-cover rounded-md shadow"
                /> */}
                <div>
                  <h2 className="font-semibold text-lg">{item.productName}</h2>
                  <p className="font-semibold text-lg">{item.set}</p>
                  
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <p className="font-bold text-xl">$<span className="text-green-800"> {item.price}</span></p>
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
          <h2 className="text-xl font-bold ">Total: $<span className="text-green-800">{calculateTotal()}</span></h2>
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Checkout
          </button>
        </div>

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
