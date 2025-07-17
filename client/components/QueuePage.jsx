import React, { useEffect } from "react";
import Navbar from "./Navbar";
import TokenCard from "./TokenCard";
import { useParams } from "react-router-dom";
import PopupToken from "./PopupToken";
import { useState } from "react";
import axios from "axios";

const QueuePage = () => {
  const { queueId } = useParams();

  const [tokens, setTokens] = useState([]);
  const [queueName, setQueueName] = useState("");

  const [TName, setTName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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

  const handleClick = async () => {
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
        <div className="flex flex-col items-center">
          <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold mt-10">
              {queueName}
            </h1>
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-2 mt-10 bg-blue-600 rounded-xl text-lg text-white font-semibold hover:cursor-pointer hover:bg-yellow-500 outline-none transition-all duration-300"
            >
              Create New Token
            </button>
          </div>
        </div>

        <div className="max-w-5xl p-10 mt-20 w-full mx-auto border bg-gray-50 border-gray-300 shadow-lg rounded-xl">
          {tokens.map((t, index) => {
            return (
              <TokenCard
                key={index}
                data={t}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onAssign={handleOnAssign}
                onCancel={handleOnCancel}
              />
            );
          })}
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
  );
};

export default QueuePage;
