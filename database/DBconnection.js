import mongoose from "mongoose";

export const DBconnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected:", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};
