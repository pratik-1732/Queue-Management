import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

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

      const token = createToken({ email });

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
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
