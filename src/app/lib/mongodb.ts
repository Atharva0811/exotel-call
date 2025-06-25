import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

async function connectToDatabase() {
  console.log("Attempting to connect to database...");
  console.log("MONGODB_URI:", MONGODB_URI); // <-- Add this line
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("Successfully connected to database!");
    return conn;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

export default connectToDatabase;