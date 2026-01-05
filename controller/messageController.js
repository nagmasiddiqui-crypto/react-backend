import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import  Message  from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, message } = req.body;

  if (!firstName || !message) {
    return res.status(400).json({
      success: false,
      message: "First name and message are required",
    });
  }

  await Message.create({
    firstName,
    lastName,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});
