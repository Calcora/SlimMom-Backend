import bcrypt from "bcrypt";
import User from "../db/models/user.js";

import { loginUser, registerUser } from "../services/authService.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const registerPayload = req.body;
    await registerUser(registerPayload);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ error: "Server error", message: error.message });
    next(error);
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const loginPayload = req.body;
    const token = await loginUser(loginPayload);

    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ error: "Server error", message: error.message });
    next(error);
  }
};
// LOGOUT
export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
    next(error);
  }
};
