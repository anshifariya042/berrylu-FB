// // import React, { useEffect, useState } from "react";
// // import { FaSearch, FaBan, FaUnlock, FaUserShield } from "react-icons/fa";
// // import toast from "react-hot-toast";
// // import api, { mapId } from "../api/api";

// // export default function Users() {
// //   const [users, setUsers] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const fetchUsers = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/admin/users");
// //       setUsers(mapId(res.data));
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to load users");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const handleBlockToggle = async (user) => {
// //     try {
// //       const res = await api.put(`/admin/users/${user.id}`, {
// //         blocked: !user.blocked,
// //       });

// //       setUsers((prev) =>
// //         prev.map((u) => (u.id === user.id ? mapId(res.data) : u))
// //       );

// //       toast.success(user.blocked ? "User unblocked" : "User blocked");
// //     } catch (err) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   const handleAdminToggle = async (user) => {
// //     try {
// //       const res = await api.put(`/admin/users/${user.id}`, {
// //         isAdmin: !user.isAdmin,
// //       });

// //       setUsers((prev) =>
// //         prev.map((u) => (u.id === user.id ? mapId(res.data) : u))
// //       );

// //       toast.success(user.isAdmin ? "Admin removed" : "Admin added");
// //     } catch (err) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   const filteredUsers = users.filter(
// //     (u) =>
// //       u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
// //       u.email?.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>

// //       {/* Search */}
// //       <div className="flex items-center gap-3 mb-6">
// //         <FaSearch className="text-gray-500" />
// //         <input
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           placeholder="Search users..."
// //           className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-400"
// //         />
// //       </div>

// //       {/* Table */}
// //       <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
// //         {loading ? (
// //           <p className="p-6 text-center">Loading...</p>
// //         ) : (
// //           <table className="min-w-full text-sm">
// //             <thead className="bg-pink-100 text-gray-700">
// //               <tr>
// //                 <th className="p-3 text-left">#</th>
// //                 <th className="p-3 text-left">Name</th>
// //                 <th className="p-3 text-left">Email</th>
// //                 <th className="p-3 text-center">Status</th>
// //                 <th className="p-3 text-center">Role</th>
// //                 <th className="p-3 text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {filteredUsers.map((u, i) => (
// //                 <tr
// //                   key={u.id}
// //                   className="border-b hover:bg-gray-50 transition"
// //                 >
// //                   <td className="p-3">{i + 1}</td>
// //                   <td className="p-3 font-medium">{u.name}</td>
// //                   <td className="p-3 text-gray-600">{u.email}</td>

// //                   {/* Block status */}
// //                   <td className="p-3 text-center">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
// //                         u.blocked
// //                           ? "bg-red-100 text-red-600"
// //                           : "bg-green-100 text-green-600"
// //                       }`}
// //                     >
// //                       {u.blocked ? "Blocked" : "Active"}
// //                     </span>
// //                   </td>

// //                   {/* Role */}
// //                   <td className="p-3 text-center">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
// //                         u.isAdmin
// //                           ? "bg-purple-100 text-purple-600"
// //                           : "bg-blue-100 text-blue-600"
// //                       }`}
// //                     >
// //                       {u.isAdmin ? "Admin" : "User"}
// //                     </span>
// //                   </td>

// //                   {/* Actions */}
// //                   <td className="p-3 text-center flex justify-center gap-4">
// //                     <button
// //                       onClick={() => handleBlockToggle(u)}
// //                       className={`p-2 rounded-lg text-white ${
// //                         u.blocked
// //                           ? "bg-green-500 hover:bg-green-600"
// //                           : "bg-red-500 hover:bg-red-600"
// //                       }`}
// //                     >
// //                       {u.blocked ? <FaUnlock /> : <FaBan />}
// //                     </button>

// //                     <button
// //                       onClick={() => handleAdminToggle(u)}
// //                       className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
// //                     >
// //                       <FaUserShield />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}

// //               {filteredUsers.length === 0 && (
// //                 <tr>
// //                   <td colSpan="6" className="p-6 text-center text-gray-500">
// //                     No users found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




import React, { useEffect, useState } from "react";
import { FaSearch, FaBan, FaUnlock, FaUserShield, FaUserCircle } from "react-icons/fa";
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
      
    const statusMessage = user.isAdmin 
      ? `${user.name || "User"} is no longer an Admin` 
      : `${user.name || "User"} is now an Admin`;
    
    toast.success(statusMessage);    } catch (err) {
      toast.error("Update failed");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Directory</h1>
          <p className="text-slate-500 text-sm">Manage access levels and account status</p>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-medium">
            <div className="animate-spin mb-4 inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            <p>Fetching users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-slate-300">
                            <FaUserCircle size={36} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800">{u.fullName || u.name}</span>
                            <span className="text-xs text-slate-400">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          u.blocked 
                          ? "bg-rose-50 text-rose-600 border-rose-100" 
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}>
                          {u.blocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          u.isAdmin 
                          ? "bg-indigo-50 text-indigo-600 border-indigo-200" 
                          : "bg-slate-50 text-slate-500 border-slate-200"
                        }`}>
                          {u.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleBlockToggle(u)}
                            title={u.blocked ? "Unblock User" : "Block User"}
                            className={`p-2.5 rounded-xl transition-all ${
                              u.blocked
                                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                            }`}
                          >
                            {u.blocked ? <FaUnlock size={14} /> : <FaBan size={14} />}
                          </button>

                          <button
                            onClick={() => handleAdminToggle(u)}
                            title={u.isAdmin ? "Revoke Admin" : "Make Admin"}
                            className={`p-2.5 rounded-xl transition-all ${
                              u.isAdmin
                                ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                            }`}
                          >
                            <FaUserShield size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}