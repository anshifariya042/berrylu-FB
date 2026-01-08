import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Orders() {
  const { orders, cancelOrder } = useCart();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleCancel = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await cancelOrder(orderId);
    }
  };

  return (
    <div className="px-3 md:px-16 pb-5 bg-gray-50 min-h-screen relative z-10">
      <p className="text-2xl font-bold text-pink-500 mb-10 text-center pb-5 mt-5">
        Order Details
      </p>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No orders found 🛍️
        </p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-gray-600 font-normal">
                      {order._id || order.id}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {order.date}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${order.status === "cancelled" ? "bg-red-100 text-red-600" :
                      order.status === "delivered" ? "bg-green-100 text-green-600" :
                        "bg-blue-100 text-blue-600"
                    }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-sm transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} | Size: {item.size}
                      </p>
                    </div>
                    <p className="font-semibold text-pink-600 text-sm">
                      ₹{item.newPrice || item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-5  pt-4 border-t">
                <p className="font-semibold text-gray-700 text-lg">
                  Total:{" "}
                  <span className="text-pink-600">₹{order.totalAmount || order.total}</span>
                </p>
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id || order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
