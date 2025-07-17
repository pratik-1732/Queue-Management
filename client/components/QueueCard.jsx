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
      className="p-5 flex flex-col items-center justify-center border border-gray-300 shadow-lg rounded-xl hover:scale-105 hover:cursor-pointer hover:border-blue-500 transition-all duration-500"
    >
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <button
        onClick={handleViewQueue}
        className="bg-blue-600 mt-10 font-semibold text-white text-base rounded-lg px-3 py-2 hover:bg-yellow-500 hover:cursor-pointer transition-all duration-300"
      >
        View Queue
      </button>
    </div>
  );
};

export default QueueCard;
