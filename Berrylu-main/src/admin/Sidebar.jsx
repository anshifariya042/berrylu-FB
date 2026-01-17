// import React from "react";
// import { Link, useLocation ,useNavigate} from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   FaTshirt,
//   FaList,
//   FaShoppingCart,
//   FaUsers,
//   FaSignOutAlt,
//   FaHome
// } from "react-icons/fa";

// export default function Sidebar() {
//   const { pathname } = useLocation();
//   const navigate=useNavigate();

//   const linkClass = (path) =>
//     `flex items-center gap-3 px-5 py-3 rounded-lg font-medium transition ${
//       pathname === path
//         ? "bg-blue-500 text-white"
//         : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//     }`;

//     const handleLogout=()=>{
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("isLoggedIn");
//       toast.success("Logged out succesfully")
//       navigate("/login" ,{replace:true});
      
//     }

//   return (
//     <aside className="w-64 bg-white shadow-xl flex flex-col justify-between border-r border-gray-200">
//       <div>
//         <div className="p-6 border-b">
//           <h2 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
//             <FaTshirt /> Berrylu Admin
//           </h2>
//         </div>

//         <nav className="p-4 flex flex-col space-y-2">
//           <Link to="/admin" className={linkClass("/admin")}>
//             <FaHome /> Dashboard
//           </Link>
//           <Link to="/admin/list" className={linkClass("/admin/list")}>
//             <FaList /> Product List
//           </Link>
//           <Link to="/admin/orders" className={linkClass("/admin/orders")}>
//             <FaShoppingCart /> Orders
//           </Link>
//           <Link to="/admin/users" className={linkClass("/admin/users")}>
//             <FaUsers /> Users
//           </Link>
//         </nav>
//       </div>

//       <button 
//       onClick={handleLogout}
//       className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-100 border-t font-semibold">
//         <FaSignOutAlt /> Logout
//       </button>
//     </aside>
//   );
// }



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaTshirt,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaHome,
  FaChevronRight
} from "react-icons/fa";

export default function Sidebar({ closeSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Optimized Link Styling
  const linkClass = (path) => {
    const isActive = pathname === path;
    return `group flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
    }`;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <FaHome /> },
    { path: "/admin/list", label: "Product List", icon: <FaList /> },
    { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { path: "/admin/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <aside className="h-full w-full bg-white flex flex-col">
      {/* Brand Logo */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="bg-pink-600 p-2 rounded-xl shadow-lg shadow-pink-200 text-white">
            <FaTshirt size={22} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Berrylu<span className="text-pink-600">.</span>
          </h2>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={closeSidebar} // Closes mobile drawer when clicking a link
            className={linkClass(item.path)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
            {pathname === item.path && <FaChevronRight size={10} className="opacity-50" />}
          </Link>
        ))}
      </nav>
 
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      
    </aside>
  );
}