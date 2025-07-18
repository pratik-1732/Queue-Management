import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QueueCard from "./QueueCard";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Popup from "./Popup";

const Dashboard = () => {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState("");
  const [queues, setQueues] = useState([]);
  const [QName, setQName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/${userId}`
      );
      setUserInfo(response.data);

      setQueues(response.data.queues);
    } catch (error) {
      console.error("Error getting dashboard info:", error);
      setQueues([]);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const handleClick = async () => {
    console.log(QName);
    const bgColor = getRandomLightColor();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/queues`,
        {
          QName,
          userId,
          bgColor,
        }
      );
      console.log(response);
      setShowPopup(false);
      setQName("");
      await getUserInfo();
    } catch (error) {
      console.error("error creating new queues", error);
    }
  };

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 55;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* heading  */}
        <div>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-5 pt-10">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {userInfo.name}
              </span>
            </h1>
            <p className="text-gray-600 text-lg">Manage your queues below</p>
          </div>
          <button
            className="absolute text-white top-20 hover:cursor-pointer right-5 bg-gradient-to-r from-red-400 to-orange-600 backdrop-blur-sm border border-gray-200 font-semibold px-6 py-3 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate(`/`)}
          >
            Logout
          </button>
        </div>

        {/* button aur para */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 bg-white rounded-2xl shadow-lg py-6 px-10">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your Queues
              </h2>
              <p className="text-gray-600">Organize and manage your Queues</p>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 hover:cursor-pointer transition-all duration-300"
            >
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
              <div className="relative flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <span>Create New Queue</span>
              </div>
            </button>
          </div>
        </div>

        {/* Queues */}
        {queues && queues.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Queues Yet...
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Get started by creating your first queue
            </p>
          </div>
        ) : (
          <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {queues.map((queue, index) => (
              <QueueCard key={index} data={queue} />
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <Popup
          QName={QName}
          setQName={setQName}
          onClose={() => setShowPopup(false)}
          onSubmit={handleClick}
        />
      )}
    </div>
  );
};

export default Dashboard;
