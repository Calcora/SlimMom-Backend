import CalorieEntry from "../db/models/calorieEntry.js";
import { isDateMatch } from "../utils/isDateMatch.js";

import Product from "../db/models/product.js";

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

export const addFoodByDate = async (userId, payload) => {
  console.log("⚠️ Add food service - request data:", userId, payload);

  const entriesCalorieEntry = await CalorieEntry.findOne({
    userId: userId,
  });
  if (!entriesCalorieEntry) {
    throw new Error("No calorie entries found for this user.");
  }

  const isDateMatchStatus = isDateMatch(
    entriesCalorieEntry.createdAt,
    payload.date
  );

  if (!isDateMatchStatus) {
    throw new Error("No calorie entries found for this date.");
  }

  const findProduct = await Product.findOne({ title: payload.data.name });
  // const filter = parseFilterParams(query);
  //   await Product.find(filter);
  if (!findProduct) {
    throw new Error("No product found with this name.");
  }
  console.log("Found Product:", findProduct.title);

  const productCalorie = Number(
    (findProduct.calories / 100) * payload.data.weight
  );

  const newLeft = Number(entriesCalorieEntry.left) - productCalorie;
  entriesCalorieEntry.left = newLeft;

  const newConsumed = Number(entriesCalorieEntry.consumed) + productCalorie;
  entriesCalorieEntry.consumed = newConsumed;

  const newPercentage =
    (newConsumed / Number(entriesCalorieEntry.dailyRate)) * 100;
  entriesCalorieEntry.nOfNormal = Math.round(newPercentage);

  entriesCalorieEntry.eatenFoods.push({
    id: Math.floor(Math.random() * 100000),
    name: payload.data.name,
    weight: payload.data.weight,
    calories: productCalorie,
  });
  await entriesCalorieEntry.save();

  return entriesCalorieEntry;
};

export const removeFoodFromDateById = async (userId, payload) => {
  console.log("⚠️ Remove food service - request data:", userId, payload);

  const entriesCalorieEntry = await CalorieEntry.findOne({
    userId: userId,
  });
  if (!entriesCalorieEntry) {
    throw new Error("No calorie entries found for this user.");
  }

  const foodItems = entriesCalorieEntry.eatenFoods;

  const newFoodItems = foodItems.filter(
    (item) => item.id !== Number(payload.data.id)
  );

  console.log("New Items: ", newFoodItems);

  entriesCalorieEntry.eatenFoods = newFoodItems;
  await entriesCalorieEntry.save();

  return entriesCalorieEntry;
};
