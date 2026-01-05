import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import app from "./app.js";

/* ---------- ENV CONFIG ---------- */
dotenv.config({ path: "./config/config.env" });

/* ---------- CLOUDINARY ---------- */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------- MONGODB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    /* ---------- SERVER START ---------- */
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
