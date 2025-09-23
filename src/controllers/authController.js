import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //aynı maille sahip kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ username, email, passwordHash: password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    // Find user by user
    const user = await User.findOne({
      $or: [{ email: loginId }, { username: loginId }],
    });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    // JWT token generation
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200)({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// LOGOUT
export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
