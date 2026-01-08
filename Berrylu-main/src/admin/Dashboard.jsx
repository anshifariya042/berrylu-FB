import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTshirt, FaShoppingBag, FaTimesCircle } from "react-icons/fa";
import StatsCard from "./StatsCard";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
        const [
          usersRes,
          productsRes,
          westernRes,
          bagsRes,
          shoesRes,
          ordersRes,
        ] = await Promise.all([
          axios.get("http://localhost:4000/users"),
          axios.get("http://localhost:4000/products"),
          axios.get("http://localhost:4000/western"),
          axios.get("http://localhost:4000/bags"),
          axios.get("http://localhost:4000/shoes"),
          axios.get("http://localhost:4000/orders"),
        ]);

        const totalProducts =
          (productsRes.data?.length || 0) +
          (westernRes.data?.length || 0) +
          (bagsRes.data?.length || 0) +
          (shoesRes.data?.length || 0);

        const users = usersRes.data?.length || 0;
        const orders = ordersRes.data?.length || 0;
        const cancelled =
          ordersRes.data?.filter((o) => o.status === "cancelled").length || 0;

        setStats({ users, products: totalProducts, orders, cancelled });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: FaUsers,
      color: "bg-blue-500",
      link: "/admin/users",
    },
    {
      title: "Products",
      value: stats.products,
      icon: FaTshirt,
      color: "bg-green-500",
      link: "/admin/list",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: FaShoppingBag,
      color: "bg-yellow-500",
      link: "/admin/orders",
    },
    {
      title: "Cancelled Orders",
      value: stats.cancelled,
      icon: FaTimesCircle,
      color: "bg-red-500",
    },
  ];

  // Pie Chart Data
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} to={stat.link}>
            <StatsCard {...stat} />
          </Link>
        ))}
      </div>

      {/* Reports Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mt-6 border border-gray-100 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left">
            Reports Summary
          </h2>
          <p className="text-gray-500 text-sm text-center md:text-right mt-1 md:mt-0">
            Visual overview of platform performance
          </p>
        </div>

        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.9} />
                </linearGradient>
                <linearGradient id="colorProducts" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#34D399" stopOpacity={0.9} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FACC15" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity={0.9} />
                </linearGradient>
                <linearGradient id="colorCancelled" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#F87171" stopOpacity={0.9} />
                </linearGradient>
              </defs>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                label={({ percent }) =>
                  `${(percent * 100).toFixed(1)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#color${entry.name})`}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
