import express from "express";
import { sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Message API is working");
});

router.post("/send", sendMessage);

export default router;
