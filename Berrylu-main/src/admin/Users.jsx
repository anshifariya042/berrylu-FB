import React, { useEffect, useState } from "react";
import { FaSearch, FaBan, FaUnlock, FaUserShield } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  // 🧱 Block / Unblock user
  const handleBlockToggle = async (user) => {
    try {
      const updatedUser = { ...user, blocked: !user.blocked };
      await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );

      toast.success(
        updatedUser.blocked
          ? `${user.fullName} has been blocked`
          : `${user.fullName} has been unblocked`
      );
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user status");
    }
  };

  // 🛡️ Add / Remove Admin
  const handleAdminToggle = async (user) => {
    try {
      const updatedUser = { ...user, isAdmin: !user.isAdmin };
      await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );

      toast.success(
        updatedUser.isAdmin
          ? `${user.fullName} is now an Admin`
          : `${user.fullName} is no longer an Admin`
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update admin status");
    }
  };

  // 🔍 Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Search bar */}
        <div className="relative w-full md:w-1/3 mb-5 px-5">
          <FaSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg  py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
        </div>

        {/* Users Table */}
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-100 text-gray-700 text-left">
                  <th className="py-3 px-4 border-b">#</th>
                  <th className="py-3 px-4 border-b">Full Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b"> Block Status</th>
                  <th className="py-3 px-4 border-b"> Admin Status</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b last:border-none"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.fullName}</td>
                    <td className="py-3 px-4">{user.email}</td>

                    <td className="py-3 px-4">
                      {user.blocked ? (
                        <span className="text-red-500 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {user.isAdmin ? (
                        <span className="text-purple-600 font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">User</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center space-x-3">

                      <button
                        onClick={() => handleBlockToggle(user)}
                        className={`${user.blocked
                            ? "text-green-600 hover:text-green-800"
                            : "text-red-500 hover:text-red-700"
                          } transition`}
                        title={user.blocked ? "Unblock User" : "Block User"}
                      >
                        {user.blocked ? <FaUnlock /> : <FaBan />}
                      </button>

                      <button
                        onClick={() => handleAdminToggle(user)}
                        className={`${user.isAdmin
                            ? "text-gray-500 hover:text-gray-700"
                            : "text-purple-600 hover:text-purple-800"
                          } transition`}
                        title={
                          user.isAdmin
                            ? "Remove Admin"
                            : "Promote to Admin"
                        }
                      >
                        <FaUserShield />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}
