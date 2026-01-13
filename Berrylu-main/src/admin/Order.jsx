import React, { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.patch(`/admin/orders/${id}`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
      toast.success("Order status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await api.delete(`/admin/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted");
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Search */}
      <div className="mb-4 w-full md:w-1/3 relative">
        <input
          type="text"
          placeholder="Search by Order ID, User ID, Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 pl-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-pink-100 text-gray-700 text-left">
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Update Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50 border-b last:border-none">
                  <td className="py-3 px-4 font-medium">{o._id}</td>
                  <td className="py-3 px-4">{o.userId}</td>
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`font-semibold ${
                        o.status === "pending"
                          ? "text-yellow-500"
                          : o.status === "shipped"
                          ? "text-blue-500"
                          : o.status === "delivered"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(o._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
