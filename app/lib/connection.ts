import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB... ", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
