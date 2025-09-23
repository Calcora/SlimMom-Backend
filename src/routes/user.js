import express from "express";
import { registerSchema, loginSchema } from "../validation/userSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), (req, res) => {
  res.json({ message: "Registration data is valid" });
});

router.post("/login", validateBody(loginSchema), (req, res) => {
  res.json({ message: "Login data is valid" });
});

export default router;
