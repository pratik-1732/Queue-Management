import mongoose from "mongoose";
import Queue from "./queue.js";

const tokenSchema = mongoose.Schema({
  number: {
    type: Number,
  },
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["waiting", "called", "completed"],
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  queueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Queue",
    required: true,
  },
  waitStartTime: {
    type: Date,
  },
  waitEndTime: {
    type: Date,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
