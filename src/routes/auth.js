import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const authrouter = express.Router();

authrouter.get("/profile", verifyToken, async (req, res) => {
  res.json({ message: "Welcome to ${req.user.email} profile" });
});

authrouter.post("/register", register);

authrouter.post("/login", login);

authrouter.post("/logout", logout);

export default authrouter;
