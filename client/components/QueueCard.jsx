import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const QueueCard = ({ data }) => {
  console.log(data);
  console.log(data._id);

  const navigate = useNavigate();

  const handleViewQueue = () => {
    navigate(`/queuepage/${data._id}`);
  };

  return (
    <div
      style={{ backgroundColor: data.bgColor }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:cursor-pointer"
    >
      <div className="relative p-6 flex flex-col items-center">
        <div className=" justify-between mb-4">
          <h3 className="text-3xl font-bold text-black truncate">
            {data.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-lg font-semibold">
            {data.tokens?.length || 0} members
          </span>
        </div>
        <button
          onClick={handleViewQueue}
          className="group mt-5 relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <div className="relative flex items-center space-x-2">
            <span>View Queue</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QueueCard;
