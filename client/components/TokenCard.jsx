import React from "react";

const TokenCard = ({ data, onMoveUp, onMoveDown, onAssign, onCancel }) => {
  const { name, number, position, status, _id } = data;

  return (
    <div className="flex justify-between items-center p-4 mb-3 bg-gray-200 rounded-xl shadow-md">
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-blue-500">{status}</p>
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
          //   disabled={token.position !== 1 || token.status !== "waiting"}
        >
          ✅
        </button>

        <button
          className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded hover:cursor-pointer"
          onClick={() => onCancel(_id)}
          //   disabled={token.status !== "waiting"}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
