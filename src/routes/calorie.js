import express from "express";
import {
  privateCalorieEntryController,
  publicCalorieEntryController,
} from "../controllers/calorieController.js";

import { getAllFoodByDateController } from "../controllers/dayFoodController.js";

import { verifyToken } from "../middlewares/auth.js";

const calorieRouter = express.Router();

// Prviate calorie entry
calorieRouter.post("/private", verifyToken, privateCalorieEntryController);
// Private get all calorie entries for the day
// calorieRouter.get("/private/all", verifyToken, getAllFoodByDateController);

calorieRouter.post("/public", publicCalorieEntryController);

export default calorieRouter;
