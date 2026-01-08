import React from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaTshirt,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate=useNavigate();

  const linkClass = (path) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg font-medium transition ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

    const handleLogout=()=>{
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isLoggedIn");
      toast.success("Logged out succesfully")
      navigate("/login" ,{replace:true});
      
    }

  return (
    <aside className="w-64 bg-white shadow-xl flex flex-col justify-between border-r border-gray-200">
      <div>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            <FaTshirt /> Berrylu Admin
          </h2>
        </div>

        <nav className="p-4 flex flex-col space-y-2">
          <Link to="/admin" className={linkClass("/admin")}>
            <FaHome /> Dashboard
          </Link>
          <Link to="/admin/list" className={linkClass("/admin/list")}>
            <FaList /> Product List
          </Link>
          <Link to="/admin/orders" className={linkClass("/admin/orders")}>
            <FaShoppingCart /> Orders
          </Link>
          <Link to="/admin/users" className={linkClass("/admin/users")}>
            <FaUsers /> Users
          </Link>
        </nav>
      </div>

      <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-100 border-t font-semibold">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}
