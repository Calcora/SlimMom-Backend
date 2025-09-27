import { getAllFoodByDate } from "../services/dayFoodService.js";

export const getAllFoodByDateController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.query.date; // Expecting date in 'YYYY-MM-DD' format

    await getAllFoodByDate(userId, date);
    res.status(200).json({ message: "Food entries retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

export const addFoodToTodayController = async (req, res) => {};

export const removeFoodFromTodayController = async (req, res) => {};
