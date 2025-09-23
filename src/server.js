import express from "express";
import cors from "cors";
import { env } from "../src/utils/env.js";
import router from "./routes/auth.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = env("PORT") || 3000;

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/auth", router);

  // app.use("*", notFoundHandler);
  app.use(errorHandler);
  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.listen(PORT, () => {
    console.log(`✅ | Server running on port ${PORT}`);
  });
}
