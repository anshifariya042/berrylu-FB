import React, { useEffect, useState } from "react";
import { FaSearch, FaBan, FaUnlock, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(mapId(res.data));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async (user) => {
    try {
      const res = await api.put(`/admin/users/${user.id}`, {
        blocked: !user.blocked,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? mapId(res.data) : u))
      );

      toast.success(user.blocked ? "User unblocked" : "User blocked");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleAdminToggle = async (user) => {
    try {
      const res = await api.put(`/admin/users/${user.id}`, {
        isAdmin: !user.isAdmin,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? mapId(res.data) : u))
      );

      toast.success(user.isAdmin ? "Admin removed" : "Admin added");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>

      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <FaSearch className="text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-pink-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-gray-600">{u.email}</td>

                  {/* Block status */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.blocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {u.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.isAdmin
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center flex justify-center gap-4">
                    <button
                      onClick={() => handleBlockToggle(u)}
                      className={`p-2 rounded-lg text-white ${
                        u.blocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {u.blocked ? <FaUnlock /> : <FaBan />}
                    </button>

                    <button
                      onClick={() => handleAdminToggle(u)}
                      className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                    >
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
