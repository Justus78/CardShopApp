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
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-20 h-28 object-cover rounded-md shadow"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.productName}</h2>
                  <p className="text-gray-500">Set: {item.setName}</p>
                  <p className="text-gray-600 font-medium">${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
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
          <h2 className="text-xl font-bold">Total: ${calculateTotal()}</h2>
          <button
            onClick={() => navigate("/checkout")} // later replace with Stripe checkout
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
