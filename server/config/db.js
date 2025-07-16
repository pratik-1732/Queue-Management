import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected successfully...");
  } catch (error) {
    console.error("DB connection: ", error);
  }
};

export default connectDB;
