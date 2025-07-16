import mongoose from "mongoose";
import Queue from "./queue.js";

const tokenSchema = mongoose.Schema({
  number: String,
  name: String,
  status: {
    type: String,
    enum: ["waiting", "assigned", "completed", "cancelled"],
    default: "waiting",
  },
  position: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  queueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Queue",
    required: true,
  },
  assignAt: Date,
  cancelled: Date,
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
