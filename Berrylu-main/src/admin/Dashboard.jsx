// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUsers, FaTshirt, FaShoppingBag, FaTimesCircle } from "react-icons/fa";
// import StatsCard from "./StatsCard";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import api from "../api/api"; // use your axios instance

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     orders: 0,
//     cancelled: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/admin/dashboard");
//         setStats({
//           users: res.data.users,
//           products: res.data.products,
//           orders: res.data.orders,
//           cancelled: res.data.cancelled,
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const statCards = [
//     { title: "Total Users", value: stats.users, icon: FaUsers, color: "bg-blue-500", link: "/admin/users" },
//     { title: "Products", value: stats.products, icon: FaTshirt, color: "bg-green-500", link: "/admin/list" },
//     { title: "Orders", value: stats.orders, icon: FaShoppingBag, color: "bg-yellow-500", link: "/admin/orders" },
//     { title: "Cancelled Orders", value: stats.cancelled, icon: FaTimesCircle, color: "bg-red-500" },
//   ];

//   const chartData = [
//     { name: "Users", value: stats.users },
//     { name: "Products", value: stats.products },
//     { name: "Orders", value: stats.orders },
//     { name: "Cancelled", value: stats.cancelled },
//   ];

//   const COLORS = ["#3B82F6", "#10B981", "#FACC15", "#EF4444"];

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((stat, i) => (
//           <Link key={i} to={stat.link}>
//             <StatsCard {...stat} />
//           </Link>
//         ))}
//       </div>

//       <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mt-6 border border-gray-100 w-full">
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Reports Summary</h2>
//         <div className="w-full h-[400px] flex justify-center items-center">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie data={chartData} cx="50%" cy="50%" innerRadius={90} outerRadius={120} paddingAngle={2} dataKey="value">
//                 {chartData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend verticalAlign="bottom" height={36} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTshirt, FaShoppingBag, FaTimesCircle } from "react-icons/fa";
import StatsCard from "./StatsCard";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats({
          users: res.data.users,
          products: res.data.products,
          orders: res.data.orders,
          cancelled: res.data.cancelled,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.users, icon: FaUsers, color: "bg-indigo-600", link: "/admin/users" },
    { title: "Total Products", value: stats.products, icon: FaTshirt, color: "bg-emerald-500", link: "/admin/list" },
    { title: "Total Orders", value: stats.orders, icon: FaShoppingBag, color: "bg-amber-500", link: "/admin/orders" },
    { title: "Cancelled", value: stats.cancelled, icon: FaTimesCircle, color: "bg-rose-500", link: "#" }, // Added # so link logic doesn't break
  ];

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
    { name: "Cancelled", value: stats.cancelled },
  ];

  // Modernized color palette (Slightly softer tones)
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Welcome back! Here is what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link 
            key={i} 
            to={stat.link} 
            className="group transition-transform duration-200 hover:-translate-y-1"
          >
            <StatsCard {...stat} />
          </Link>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 transition-all">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Distribution Report</h2>
            <p className="text-sm text-slate-400">Activity breakdown across all sectors</p>
          </div>
          <div className="hidden sm:block">
          </div>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={140}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }} 
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-slate-600 font-medium px-2">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}