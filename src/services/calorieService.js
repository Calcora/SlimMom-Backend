import CalorieEntry from "../db/models/calorieEntry";
import Product from "../db/models/product";

export const privateCalorieEntry = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } =
    req.body.userData;
  const dailyRate =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  // const notAllowedProducts = Product.
};
