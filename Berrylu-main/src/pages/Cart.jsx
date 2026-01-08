import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return <div className="text-center py-20 text-xl">Your cart is empty 🛍️</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 mt-7">
      <h1 className="text-3xl font-semibold mb-6 flex  justify-center mt-5">Cart</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-pink-600 font-semibold mt-1">
                {item.newPrice || item.price}
              </p>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id, item.size)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
  


      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Clear Cart
        </button>

         <button
          onClick={() => navigate("/payment")}
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
