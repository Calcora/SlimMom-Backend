import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; //Bearer token
  if (!token)
    throw new createHttpError(400,"Access denied. No token provided.");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ error: "Invalid token." });
    req.user = decoded;
    next();
  });
};
