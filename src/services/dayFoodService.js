import CalorieEntry from "../db/models/calorieEntry.js";

export const getAllFoodByDate = async (userId, date) => {
  console.log(userId, date);

  const entriesCalorieEntry = await CalorieEntry.findOne({
    userId: userId,
  });

  if (!entriesCalorieEntry) {
    throw new Error("No calorie entries found for this user.");
  }

  const isDateMatch =
    entriesCalorieEntry.createdAt.toISOString().split("T")[0] === date;

  if (!isDateMatch) {
    throw new Error("No calorie entries found for this date.");
  }

  return entriesCalorieEntry;
};
