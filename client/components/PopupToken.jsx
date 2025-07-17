import React from "react";

const PopupToken = ({ TName, setTName, onClose, onSubmit }) => {

  return (
    <div className="max-w-2xl border border-gray-400 shadow-xl rounded-xl p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 z-50">
      <h1 className="text-3xl text-center font-semibold">Create New Token</h1>
      <div className="p-10">
        <div className="grid items-center">
          <label className="text-lg font-semibold">Token Name</label>
          <input
            type="text"
            className="px-3 py-2 rounded-xl border outline-none mt-2"
            name="TName"
            value={TName}
            onChange={(e) => setTName(e.target.value)}
            placeholder="Enter Token name here..."
          />
        </div>
        <div className="flex gap-10 justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            className="mt-10 px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
          >
            Create Token
          </button>
          <button
            onClick={onClose}
            className="mt-10 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupToken;
