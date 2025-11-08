import mongoose, { Mongoose } from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI in dbConnect:", MONGODB_URI);

if(!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


type ConnectionObject = {
  isConnected?: number;
};

const connection : ConnectionObject = { };

export async function connectDB() {

  if (connection.isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  const isConnected = mongoose.connections[0].readyState;
  if (isConnected) {
    connection.isConnected = isConnected;
    console.log("✅ Using previous database connection");
    return;
  }

  try {
    const db = await mongoose.connect(String(MONGODB_URI));
    console.log("MONGODB_URI:", MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}