import React from "react";

const StatusCard = ({ status, count, total, color, icon: Icon }) => {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${color.replace("bg-", "text-")}`} />
        </div>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
      <div className="text-sm text-gray-600 capitalize">{status}</div>
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusCard;
