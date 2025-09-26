import CalorieEntry from "../db/models/calorieEntry.js";
import Product from "../db/models/product.js";

export const privateCalorieEntry = async (user, userData) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = userData;
  const dailyRate = Math.ceil(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  const allProducts = await Product.find();
  const notAllowedProducts = allProducts.filter(
    (product) => product.groupBloodNotAllowed[bloodType]
  );

  const calorieEntry = await CalorieEntry.create({
    dailyRate,
    userId: user._id ?? user.id,
    consumed: 0,
    left: dailyRate,
    nOfNormal: 0,
    notAllowedProducts: notAllowedProducts.map((p) => p._id),
  });

  return calorieEntry;
};

export const publicCalorieEntry = async (userData) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = userData;
  const dailyRate = Math.ceil(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  const allProducts = await Product.find();
  const notAllowedProducts = allProducts.filter(
    (product) => product.groupBloodNotAllowed[bloodType]
  );

  return {
    dailyRate,
    consumed: 0,
    left: dailyRate,
    nOfNormal: 0,
    notAllowedProducts: notAllowedProducts.map((p) => p._id),
  };
};
