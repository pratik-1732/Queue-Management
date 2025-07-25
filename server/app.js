import express from "express";
const app = express();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

import cors from "cors";

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

console.log(process.env.FRONTEND_URL);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

import connectDB from "./config/db.js";
connectDB();

import authRoute from "./routes/auth.js";
import queuesRoute from "./routes/queues.js";
import tokenRoute from "./routes/token.js";
import analyticsRoute from "./routes/analytics.js";
import dashboardRoute from "./routes/dashboard.js";

app.use("/api/auth", authRoute);
app.use("/api/queues", queuesRoute);
app.use("/api/token", tokenRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/dashboard", dashboardRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Queue Management System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
