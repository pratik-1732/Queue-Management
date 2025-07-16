import React from "react";
import Navbar from "./Navbar";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="grid md:grid-cols-2 mt-10 items-center">
        <div className="py-10 px-10 lg:px-50 ">
          <h1 className="text-3xl lg:text-4xl font-bold mb-10 lg:mb-15 text-center">
            Create Your Account
          </h1>
          <form>
            <div className="grid grid-row-2 gap-1 mb-6">
              <label className="text-lg font-semibold text-gray-800">
                Your Name
              </label>
              <input
                type="text"
                className="text-base text-gray-800 border border-gray-400 rounded-md outline-none px-3 py-2 focus:outline-none focus:border-b-3 focus:border-blue-500"
                name="name"
                placeholder="Enter Your Name..."
                required
              />
            </div>
            <div className="grid grid-row-2 gap-1 mb-6">
              <label className="text-lg font-semibold text-gray-800">
                Your Email
              </label>
              <input
                type="email"
                className="text-base text-gray-800 border border-gray-400 rounded-md outline-none px-3 py-2 focus:outline-none focus:border-b-3 focus:border-blue-500"
                name="email"
                placeholder="Enter Your Email..."
                required
              />
            </div>
            <div className="grid grid-row-2 gap-1 mb-10">
              <label className="text-lg font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="text-base text-gray-800 border border-gray-400 rounded-md outline-none px-3 py-2 focus:outline-none focus:border-b-3 focus:border-blue-500"
                name="email"
                placeholder="Your Password..."
                required
              />
            </div>
            <div className="flex justify-center">
              <button className="px-3 py-2 bg-blue-700 text-lg text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-blue-800 outline-none transition-colors duration-200">
                Create Account
              </button>
            </div>
            <p className="mt-4 lg:text-lg">
              Already have an account?
              <a className="text-blue-700 underline decoration-2 hover:cursor-pointer hover:text-blue-500 transition-colors duration-200 ml-3">
                SignIn
              </a>
            </p>
          </form>
        </div>
        <img
          src="/images/bg-img1.jpg"
          className="h-0 w-0 md:h-full md:w-full py-10"
        />
      </div>
    </div>
  );
};

export default Signup;
