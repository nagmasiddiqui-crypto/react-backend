import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
