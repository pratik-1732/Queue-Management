import React from "react";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import QueuePage from "../components/QueuePage";
import Analytics from "../components/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/queuepage/:queueId" element={<QueuePage />} />
        <Route path="/Analytics/:queueId" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
