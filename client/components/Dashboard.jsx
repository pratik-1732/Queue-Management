import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import QueueCard from "./QueueCard";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Popup from "./Popup";

const Dashboard = () => {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState("");
  const [queues, setQueues] = useState([]);
  const [QName, setQName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
      <div className="mt-10">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center">
            Hello, {userInfo.name}
          </h1>
          <h3 className="text-2xl font-semibold text-center mt-5">
            Queues created by you
          </h3>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 mt-10 font-semibold text-white text-lg rounded-lg px-3 py-2 hover:bg-yellow-500 hover:cursor-pointer transition-all duration-300"
          >
            Create New Queue
          </button>
        </div>
        {queues && queues.length === 0 ? (
          <h3 className="text-lg text-center mt-20">
            No Queues available. Please create new Queues....
          </h3>
        ) : (
          <div className="grid grid-cols-4 gap-5 px-15 mt-20">
            {queues.map((queue, index) => {
              return <QueueCard key={index} data={queue} />;
            })}
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
