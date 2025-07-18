import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MetricCard from "./MetricCard";
import { Clock, CheckCircle, Users, UserX } from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import StatusCard from "./StatusCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Analytics = () => {
  const { queueId } = useParams();

  const [totalToken, setTotalToken] = useState("");
  const [waitingToken, setWaitingToken] = useState("");
  const [assignedToken, setAssignedToken] = useState("");
  const [cancelledToken, setCancelledToken] = useState("");
  const [averageWaitTimeInMinute, setAverageWaitTimeInMinute] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/analytics/queue/${queueId}`
        );
        console.log(response);
        const {
          assignedTokens,
          averageWaitTimeInMinutes,
          cancelledTokens,
          totalTokens,
          waitingTokens,
        } = response.data;
        setAssignedToken(assignedTokens);
        setAverageWaitTimeInMinute(averageWaitTimeInMinutes);
        setTotalToken(totalTokens);
        setWaitingToken(waitingTokens);
        setCancelledToken(cancelledTokens);
      } catch (error) {
        console.error("error in getting analytics data", error);
      }
    };
    getData();
  }, []);

  const barChartData = [
    { name: "Assigned", count: assignedToken, fill: "#10B981" },
    { name: "Waiting", count: waitingToken, fill: "#F59E0B" },
    { name: "Cancelled", count: cancelledToken, fill: "#EF4444" },
  ];
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* heading  */}
        <div className="flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Queue Analytics Dashboard
                </h1>
                <p className="text-gray-600 mt-3">
                  Real-time insights for queue
                  {/* {queueId} */}
                </p>
              </div>
            </div>
          </div>
          <button
            className="absolute top-30 hover:cursor-pointer right-5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-full hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate(`/queuepage/${queueId}`)}
          >
            ← Back to Queue Page
          </button>
        </div>

        {/* metric cards  */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <MetricCard
              title="Total Tokens"
              icon={Users}
              value={totalToken}
              color="bg-blue-500"
              subtitle="All time tokens"
            />

            <MetricCard
              title="Average Wait Time"
              value={`${averageWaitTimeInMinute} min`}
              icon={Clock}
              color="bg-purple-500"
              subtitle="Minutes per token"
            />
            <MetricCard
              title="Assigned Tokens"
              value={assignedToken}
              icon={CheckCircle}
              color="bg-green-500"
              subtitle="Successfully processed"
            />
          </div>
        </div>

        {/* status cards  */}
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-15 mx-auto">
          <StatusCard
            status="waiting"
            count={waitingToken}
            total={totalToken}
            color="bg-yellow-500"
            icon={Clock}
          />
          <StatusCard
            status="assigned"
            count={assignedToken}
            total={totalToken}
            color="bg-green-500"
            icon={CheckCircle}
          />
          <StatusCard
            status="cancelled"
            count={cancelledToken}
            total={totalToken}
            color="bg-red-500"
            icon={UserX}
          />
        </div>

        {/* Bar Chart */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Token Counts
            </h2>
          </div>
          <div className="mx-auto pt-10 max-w-6xl">
            <ResponsiveContainer width="70%" height={500}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="1000 1000" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
