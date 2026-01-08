import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you for your order!</p>
      <Link
        to="/shop"
        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default ThankYou;
