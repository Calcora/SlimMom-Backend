import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  res.json({ message: "Welcome to ${req.user.email} profile" });
});

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
