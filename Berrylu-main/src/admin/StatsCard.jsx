import React from "react";

export default function StatsCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between hover:shadow-lg transition-all">
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-full text-white text-2xl ${color}`}
        >
          <Icon />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
