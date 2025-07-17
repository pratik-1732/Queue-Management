import React, { useEffect } from "react";
import Navbar from "./Navbar";
import TokenCard from "./TokenCard";
import { useNavigate, useParams } from "react-router-dom";
import PopupToken from "./PopupToken";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const QueuePage = () => {
  const { queueId } = useParams();

  const [tokens, setTokens] = useState([]);
  const [queueName, setQueueName] = useState("");

  const [TName, setTName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const userId = useSelector((state) => state.user.userId);

  const navigate = useNavigate();

  const getTokenInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/token/${queueId}`
      );

      console.log(response);
      setTokens(response.data.tokens || []);
      setQueueName(response.data.queueName);
    } catch (error) {
      console.error("Error getting dashboard info:", error);
      setTokens([]);
    }
  };

  useEffect(() => {
    getTokenInfo();
  }, [queueId]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/token/${queueId}`,
        {
          TName,
          queueId,
        }
      );
      console.log(response);
      setShowPopup(false);
      setTName("");
      await getTokenInfo();
    } catch (error) {
      console.error("error creating new token", error);
    }
  };

  const handleMoveUp = async (tokenId) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/move-up/${tokenId}`
    );
    await getTokenInfo();
  };
  const handleMoveDown = async (tokenId) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/move-down/${tokenId}`
    );
    await getTokenInfo();
  };
  const handleOnAssign = async (tokenId) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/assign/${tokenId}`
    );
    await getTokenInfo();
  };
  const handleOnCancel = async (tokenId) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/delete/${tokenId}`
    );
    await getTokenInfo();
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <div className=" items-center max-w-5xl mx-auto mt-10">
            <h1 className="text-5xl mb-10 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {queueName}
            </h1>
            <button
              className="absolute top-30 hover:cursor-pointer right-5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-full hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate(`/dashboard/${userId}`)}
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="flex justify-center items-center gap-6 mb-12">
            <button
              onClick={() => setShowPopup(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Token
              </span>
            </button>

            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:cursor-pointer font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                View Analytics
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-3xl p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Queue Tokens
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {tokens.length} {tokens.length === 1 ? "token" : "tokens"} in
                queue
              </div>
            </div>

            <div className="space-y-4">
              {tokens.map((t, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <TokenCard
                    data={t}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onAssign={handleOnAssign}
                    onCancel={handleOnCancel}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {showPopup && (
          <PopupToken
            TName={TName}
            setTName={setTName}
            onClose={() => setShowPopup(false)}
            onSubmit={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default QueuePage;
