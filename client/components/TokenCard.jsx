import React from "react";

const TokenCard = ({ data, onMoveUp, onMoveDown, onAssign, onCancel }) => {
  const { name, number, position, status, _id } = data;

  return (
    <div className="flex justify-between items-center p-4 mb-9 bg-gray-100 rounded-xl shadow-md hover:scale-105 hover:cursor-pointer transition-all duration-300">
      <div>
        <p className="font-semibold text-xl">{name}</p>
        <p
          className={`text-sm font-semibold mt-2 ${
            status === "waiting"
              ? "text-yellow-500"
              : status === "cancelled"
              ? "text-red-600"
              : status === "assigned"
              ? "text-green-600"
              : "text-blue-500"
          }`}
        >
          {status}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onMoveUp(_id)}
        >
          🔼
        </button>

        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onMoveDown(_id)}
        >
          🔽
        </button>

        <button
          className="bg-green-300 hover:bg-green-400 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onAssign(_id)}
        >
          ✅
        </button>

        <button
          className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onCancel(_id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
