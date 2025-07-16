import React from "react";
import Navbar from "./Navbar";
import QueueCard from "./QueueCard";

const Dashboard = () => {
  const { userId } = req.params;
  return (
    <div>
      <Navbar />
      <div className="mt-10">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center">Hello, Pratik</h1>
          <h3 className="text-2xl font-semibold text-center mt-5">
            Queues created by you
          </h3>
          <button className="bg-blue-600 mt-10 font-semibold text-white text-lg rounded-lg px-3 py-2 hover:bg-yellow-500 hover:cursor-pointer transition-all duration-300">
            Create New Queue
          </button>
        </div>
        <div className="grid grid-cols-4 gap-5 px-15 mt-20">
          <QueueCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
