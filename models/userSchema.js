import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    rememberMe: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },

    avatar: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

/* Hash password before save */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

/*  Compare password */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/*  Generate JWT */
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES || "7d",
    }
  );
};

export const User = mongoose.model("User", userSchema);
