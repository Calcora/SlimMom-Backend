import { privateCalorieEntry } from "../services/calorieService.js";

export const privateCalorieEntryController = async (req, res) => {
  try {
    console.log("🧪 Gelen req.body:", req.body);
    const userData = req.body.userData;

    if (!userData) {
      return res.status(400).json({
        message: "userData is required in request body",
      });
    }

    const calorieEntry = await privateCalorieEntry(req.user, userData);

    res.status(201).json({
      message: "Private calorie entry created successfully",
      data: calorieEntry,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};
