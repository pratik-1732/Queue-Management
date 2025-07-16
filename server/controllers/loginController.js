import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({
      email: email,
    });

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, checkUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginController;
