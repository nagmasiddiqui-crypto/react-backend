import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

/* ================= REGISTER ================= */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({ email, password });

    // ✅ USE JWT UTILITY
    generateToken(user, "User registered successfully", 201, res);

  } catch (error) {
    next(error);
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ USE JWT UTILITY
    generateToken(user, "Login successful", 200, res);

  } catch (error) {
    next(error);
  }
};
