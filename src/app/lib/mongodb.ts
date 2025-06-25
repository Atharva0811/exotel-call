import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

async function connectToDatabase() {
  console.log("Attempting to connect to database...");
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Ensures commands are not buffered if connection is lost
    });
    console.log("Successfully connected to database!");
    return conn;
  } catch (error) {
    console.error("Database connection error:", error);
    // You might want to re-throw the error or handle it more gracefully
    throw error;
  }
}

export default connectToDatabase;