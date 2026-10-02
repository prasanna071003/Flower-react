import mongoose from "mongoose";

const STATES = ["disconnected", "connected", "connecting", "disconnecting"];

export const getDbState = () => STATES[mongoose.connection.readyState] ?? "unknown";

export default async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri || !uri.trim()) {
    console.warn("[db] MONGO_URI is not set in backend/.env — skipping MongoDB connection.");
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[db] MongoDB connection failed: ${err.message}`);
  }
}
