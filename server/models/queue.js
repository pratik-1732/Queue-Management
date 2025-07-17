import mongoose from "mongoose";
import Token from "./token.js";
import User from "./user.js";

const queueSchema = mongoose.Schema({
  name: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tokens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
  ],
  bgColor: String,
});

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;
