import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Go add some cards!</p>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-28 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={item.quantity <= 1}
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Subtotal + Remove */}
              <div className="flex items-center space-x-4">
                <p className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Total: ${total.toFixed(2)}
            </h2>
            <button
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
              onClick={() => alert("Stripe checkout coming soon!")}
            >
              Checkout with Stripe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
