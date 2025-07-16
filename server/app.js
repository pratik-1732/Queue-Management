import express from "express";
const app = express();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

import authRoute from "./routes/auth.js";

app.get("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Queue Management System API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
