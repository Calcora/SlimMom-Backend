import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/user.js";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  // Find user by user
  const user = await User.findOne({
    email,
  });
  console.log("👤 User found:", user);
  if (!user) throw createHttpError(400, "User not found");

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  console.log("🔑 Password valid:", validPassword);
  if (!validPassword) throw createHttpError(400, "Invalid password");

  // JWT token generation
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  console.log("🛡️ Token generated:", token);
  if (!token) {
    throw createHttpError(500, "Token generation failed");
  }

  return token;
};
export const registerUser = async (payload) => {
  const { username, email, password } = payload;
  //aynı maile ve isme sahip kullanıcı var mı kontrol et
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw createHttpError(400, "User already exists");
  }
  const user = payload;

  //password hashing
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  console.log("🔒 Hashed password:", hashedPassword);
  // Create a new user
  await User.create(user);
};
export const logout = () => {};
