import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTshirt, FaShoppingBag, FaTimesCircle } from "react-icons/fa";
import StatsCard from "./StatsCard";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api/api"; // use your axios instance

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
    { title: "Total Users", value: stats.users, icon: FaUsers, color: "bg-blue-500", link: "/admin/users" },
    { title: "Products", value: stats.products, icon: FaTshirt, color: "bg-green-500", link: "/admin/list" },
    { title: "Orders", value: stats.orders, icon: FaShoppingBag, color: "bg-yellow-500", link: "/admin/orders" },
    { title: "Cancelled Orders", value: stats.cancelled, icon: FaTimesCircle, color: "bg-red-500" },
  ];

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Products", value: stats.products },
    { name: "Orders", value: stats.orders },
    { name: "Cancelled", value: stats.cancelled },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#FACC15", "#EF4444"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} to={stat.link}>
            <StatsCard {...stat} />
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mt-6 border border-gray-100 w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Reports Summary</h2>
        <div className="w-full h-[400px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={90} outerRadius={120} paddingAngle={2} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
