import React, { useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems = [], removeFromCart } = useCart();
  const navigate = useNavigate();

  // ✅ Protect Cart Page - Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty 😢
          <div className="mt-4">
            <Link
              to="/"
              className="inline-block bg-[#800000] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#a00000] transition"
            >
              🏠 Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || `https://via.placeholder.com/600x600?text=Product+${item.id}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size} | Color: {item.color}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                className="px-3 py-1 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right text-xl font-semibold text-gray-800">
            Total: ₹{total}
          </div>
          <div className="text-right">
            <Link
              to="/buy"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition"
            >
              🛒 Buy Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
