import React from "react";

const TokenCard = ({ data, onMoveUp, onMoveDown, onAssign, onCancel }) => {
  const { name, number, position, status, _id } = data;

  const statusConfig = {
    waiting: {
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: "⏳",
      label: "Waiting",
    },
    cancelled: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "❌",
      label: "Cancelled",
    },
    assigned: {
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: "✅",
      label: "Assigned",
    },
    default: {
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "📋",
      label: "Active",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.default;

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-gray-300">
      <div className="flex justify-between items-center">
        {/* left part  */}
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">{name}</h3>
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.bgColor} ${currentStatus.color} ${currentStatus.borderColor} border`}
            >
              <span>{currentStatus.icon}</span>
              <span className="capitalize">{currentStatus.label}</span>
            </div>
          </div>
        </div>

        {/* Right part  */}
        <div className="flex items-center gap-2">
          {/* up  */}
          <button
            className="group/btn relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:cursor-pointer"
            onClick={() => onMoveUp(_id)}
            title="Move Up"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 14l5-5 5 5"
              />
            </svg>
          </button>

          {/* Down  */}
          <button
            className="group/btn relative p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform  hover:-translate-y-1 hover:cursor-pointer"
            onClick={() => onMoveDown(_id)}
            title="Move Down"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {/* Assign  */}
          <button
            className="group/btn relative p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform  hover:-translate-y-1 hover:cursor-pointer"
            onClick={() => onAssign(_id)}
            title="Assign Token"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>

          {/* Cancel */}
          <button
            className="group/btn relative p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:cursor-pointer"
            onClick={() => onCancel(_id)}
            title="Cancel Token"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
