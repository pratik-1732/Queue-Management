import React from "react";

const PopupToken = ({ TName, setTName, onClose, onSubmit }) => {
  return (
    <div className="max-w-md w-full mx-4 border border-gray-400 shadow-xl rounded-2xl pt-10 pb-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#29282b] text-white">
      <div className="relative mx-2">
        <h1 className="text-3xl text-center font-semibold">Create New Token</h1>
        <button
          onClick={onClose}
          className="absolute top-0 right-2  transform -translate-y-1/2 font-light px-2 py-1 rounded-sm bg-[#7737fe] text-white hover:cursor-pointer hover:bg-purple-800 transition-colors duration-300"
        >
          X
        </button>
      </div>
      <form onSubmit={onSubmit} className="p-10">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Token Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-[#3a3a3d] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#7737fe] focus:border-transparent transition-all duration-200"
            name="TName"
            value={TName}
            onChange={(e) => setTName(e.target.value)}
            placeholder="Enter token name..."
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" px-3 mt-10 py-2 rounded-xl bg-[#7737fe] text-white font-semibold hover:cursor-pointer hover:bg-purple-800 transition-colors duration-300"
          >
            Create Token
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupToken;
