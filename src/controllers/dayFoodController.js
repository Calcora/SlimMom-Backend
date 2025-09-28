import {
  getAllFoodByDate,
  addFoodByDate,
  removeFoodFromDateById,
} from "../services/dayFoodService.js";

export const getAllFoodByDateController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.params.date;
    const calorieEntryData = await getAllFoodByDate(userId, date);
    res.status(200).json({
      message: "Food entries retrieved successfully",
      data: calorieEntryData,
    });
  } catch (error) {
    next(error);
  }
};

export const addFoodByDateController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let foodData = {};
    foodData.date = req.params.date;
    foodData.data = req.body;
    const entries = await addFoodByDate(userId, foodData);
    res.status(201).json({
      message: "Food added successfully",
      data: entries,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFoodFromDateByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const date = req.params.date;
    const foodId = req.params.id;

    await removeFoodFromDateById(userId, {
      date,
      data: { id: foodId },
    })
      .then((data) => {
        res.status(204).json({
          message: "ID: " + foodId + " Food removed successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
