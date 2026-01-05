import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Provide a valid email!"],
    },

    phone: {
      type: String,
      required: true,
      minLength: [11, "Phone number must contain exactly 11 digits!"],
      maxLength: [11, "Phone number must contain exactly 11 digits!"],
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
