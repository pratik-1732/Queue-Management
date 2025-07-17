import express from "express";
import Queue from "../models/queue.js";
import User from "../models/user.js";

const createQueue = async (req, res) => {
  try {
    const { QName, userId, bgColor } = req.body;

    const newQueue = await Queue.create({
      name: QName,
      createdBy: userId,
      bgColor,
    });
    await newQueue.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { queues: newQueue._id },
      },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "New Queue created successfully" }, newQueue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error at queue creation" }, error);
  }
};

export default createQueue;
