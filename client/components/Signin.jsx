import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUserId } from "../src/redux/userSlice.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const userId = response.data.user.id;
      dispatch(setUserId(userId));
      navigate(`/dashboard/${userId}`);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("signin Error:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="lg:flex lg:flex-col min-h-[100dvh]">
      <Navbar />
      <div className="grid md:grid-cols-2 items-center md:pt-50 lg:pt-0">
        <div className="py-10 px-10 lg:px-40 ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 lg:mb-15 text-center">
            Login in to Your Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-row-2 gap-1 mb-6">
              <label className="text-lg font-semibold text-gray-800">
                Your Email
              </label>
              <input
                type="email"
                className="text-base text-gray-800 border border-gray-400 rounded-md outline-none px-3 py-2 focus:outline-none focus:border-b-3 focus:border-blue-500"
                name="email"
                value={email}
                placeholder="Enter Your Email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={password}
                placeholder="Your Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-7 py-2 bg-blue-700 text-lg text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-blue-800 outline-none transition-colors duration-200"
              >
                Login
              </button>
            </div>
            <p className="mt-4 lg:text-lg">
              Don't have an account?
              <a
                onClick={handleClick}
                className="text-blue-700 underline decoration-2 hover:cursor-pointer hover:text-blue-500 transition-colors duration-200 ml-3"
              >
                SignUp
              </a>
            </p>
          </form>
        </div>
        <img
          src="/images/bg-img1.jpg"
          className="h-0 w-0 md:h-full md:w-full py-10 px-5 lg:px-0"
        />
      </div>
    </div>
  );
};

export default Signin;
