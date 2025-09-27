import express from "express";
import {
  privateCalorieEntryController,
  publicCalorieEntryController,
  
} from "../controllers/calorieController.js";

import { verifyToken } from "../middlewares/auth.js";

const calorieRouter = express.Router();

calorieRouter.post("/private", verifyToken, privateCalorieEntryController);
calorieRouter.get("/private/all", verifyToken, privateDayFoodGetAllController);

calorieRouter.post("/public", publicCalorieEntryController);

export default calorieRouter;
