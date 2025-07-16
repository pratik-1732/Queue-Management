import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const saltrounds = 10;

const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.genSalt(saltrounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }
        const hashedPassword = hash;

        const newUser = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
          { id: newUser._id, email: newUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token);
        return res.status(201).json({
          message: "User created successfully",
          user: {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
          },
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signupController;
