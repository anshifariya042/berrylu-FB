import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";


export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Error fetching orders:", err);
        toast.error("Failed to fetch orders");
      });
  }, []);

  //  Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const numericId = Number(id);
      const res = await axios.patch(`http://localhost:4000/orders/${numericId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id == id ? { ...order, status: newStatus } : order
          )
        );
        toast.success(`Order marked as ${newStatus}`);
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      toast.error("Failed to update status");
      console.error("Update error:", err);
    }
  };

  // ✅ Delete order
  const handleDelete = async (id) => {
    const numericId = Number(id);
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.delete(`http://localhost:4000/orders/${numericId}`);
      if (res.status === 200 || res.status === 204) {
        setOrders((prev) => prev.filter((o) => o.id !== numericId));
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete order");
      }
    } catch (err) {
      toast.error("Failed to delete order");
      console.error("Delete error:", err);
    }
  };

  // ✅ Filter orders by ID, userId, or status
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders Management</h1>

      {/* 🔍 Search Bar */}
      <div className="relative w-full md:w-1/3 mb-5 px-5">
        <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search by Order ID, User ID, or Status..."
          className="w-full border border-gray-300 rounded-lg  py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4">Order ID</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Status</th>
              <th className="p-4">Update Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{order.id}</td>
                  <td className="p-4 text-gray-600">{order.userId}</td>
                  <td
                    className={`p-4 font-semibold ${order.status === "completed"
                        ? "text-green-600"
                        : order.status === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded-md px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>

                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
