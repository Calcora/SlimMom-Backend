import express from "express";
import {
  privateCalorieEntryController,
  publicCalorieEntryController,
} from "../controllers/calorieController.js";
import { verifyToken } from "../middlewares/auth.js";

import { validateBody } from "../middlewares/validateBody.js";

// Calorie entry validation schema
import { getAllEattenFoodsSchema } from "../validation/calorieSchema.js";

// Controller to get all food by date
import { getAllFoodByDateController } from "../controllers/dayFoodController.js";

const calorieRouter = express.Router();

calorieRouter.post("/private", verifyToken, privateCalorieEntryController);
calorieRouter.post(
  "/private/all",
  verifyToken,
  validateBody(getAllEattenFoodsSchema),
  getAllFoodByDateController
);

calorieRouter.post("/public", publicCalorieEntryController);

export default calorieRouter;
