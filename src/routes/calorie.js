import express from "express";
import {
  privateCalorieEntryController,
  publicCalorieEntryController,
} from "../controllers/calorieController.js";
import { verifyToken } from "../middlewares/auth.js";

import { validateBody } from "../middlewares/validateBody.js";
import { validateParams } from "../middlewares/validateParams.js";

// Calorie entry validation schema
import {
  addEattenFoodSchema,
  getAllEattenFoodsSchema,
  removeEattenFoodSchema,
} from "../validation/calorieSchema.js";

// Controller to get all food by date
import {
  addFoodByDateController,
  getAllFoodByDateController,
  removeFoodFromDateByIdController,
} from "../controllers/dayFoodController.js";

const calorieRouter = express.Router();

calorieRouter.post("/private", verifyToken, privateCalorieEntryController);
calorieRouter.get(
  "/private/:date/all",
  verifyToken,
  validateParams(getAllEattenFoodsSchema),
  getAllFoodByDateController
);
calorieRouter.post(
  "/private/:date/add",
  verifyToken,
  validateParams(getAllEattenFoodsSchema),
  validateBody(addEattenFoodSchema),
  addFoodByDateController
);
calorieRouter.delete(
  "/private/:date/remove/:id",
  verifyToken,
  validateParams(removeEattenFoodSchema),
  removeFoodFromDateByIdController
);

calorieRouter.post("/public", publicCalorieEntryController);

export default calorieRouter;
