import express from "express";
import { registerSchema, loginSchema } from "../validation/userSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";
import { register, login, logout } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const authrouter = express.Router();

authrouter.get("/profile", verifyToken, async (req, res) => {
  res.json({ message: "Welcome to ${req.user.email} profile" });
});

authrouter.post("/register", validateBody(registerSchema), register);

authrouter.post("/login", validateBody(loginSchema), login);

authrouter.post("/logout", logout);

export default authrouter;
