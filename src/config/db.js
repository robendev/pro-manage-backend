import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
