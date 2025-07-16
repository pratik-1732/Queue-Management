import express from "express";
import Queue from "../models/queue.js";

const getQueue = async (req, res) => {
  const { userId } = req.body;

  try {
    const queues = await Queue.find({ createdBy: userId });
    res.json({ queues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error at queue accessing" }, error);
  }
};

export default getQueue;
