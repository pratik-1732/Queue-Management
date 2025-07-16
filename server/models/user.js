import mongoose from "mongoose";
import Queue from "../models/queue.js";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  queues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Queue" }],
});

const User = mongoose.model("User", userSchema);

export default User;
