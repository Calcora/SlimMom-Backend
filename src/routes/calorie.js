import express from "express";
import { privateCalorieEntryController } from "../controllers/calorieController.js";
import { verifyToken } from "../middlewares/auth.js";

const calorieRouter = express.Router();

calorieRouter.post("/private", verifyToken, privateCalorieEntryController);

export default calorieRouter;
