import express from "express";
import Queue from "../models/queue.js";

const createQueue = async (req, res) => {
  try {
    const { name, userId } = req.body;
    console.log(name, userId);

    const newQueue = await Queue.create({
      name,
      createdBy: userId,
    });
    await newQueue.save();
    res.status(201).json({ message: "queue created successfully" }, newQueue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error at queue creation" }, error);
  }
};

export default createQueue;
