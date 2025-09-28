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

  // const allProducts = await Product.find();
  // const notAllowedProducts = allProducts.filter(
  //   (product) => product.groupBloodNotAllowed[bloodType]
  // );

  // // const todayDate = new Date();
  // // console.log("Today's date:", todayDate);

  // const calorieEntry = await CalorieEntry.create({
  //   dailyRate,
  //   userId: user._id ?? user.id,
  //   consumed: 0,
  //   left: dailyRate,
  //   nOfNormal: 0,
  //   notAllowedProducts: notAllowedProducts.map((p) => p.title),
  // });

  // return calorieEntry;
  console.log("User ID:", user.id);
  const allProducts = await Product.find();

  const notAllowedProducts = allProducts.filter(
    (product) => product.groupBloodNotAllowed[bloodType]
  );

  const notAllowedProductTitles = notAllowedProducts.map((p) => p.title);

  const existingEntry = await CalorieEntry.findOne({
    userId: user.id,
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const isDateMatch =
    existingEntry &&
    existingEntry.createdAt.toISOString().split("T")[0] === todayDate;

  if (isDateMatch) {
    console.log("Returning existing entry for today.");
    console.log("Updated existing entry for today.");
    await CalorieEntry.updateOne(
      { _id: existingEntry.id },
      {
        dailyRate,
        consumed: 0,
        left: dailyRate,
        nOfNormal: 0,
        notAllowedProducts: notAllowedProductTitles,
        eatenFoods: [],
      }
    );

    return await CalorieEntry.findById(existingEntry.id);
  } else {
    console.log("Created new entry for today.");
    return await CalorieEntry.create({
      dailyRate,
      userId: user.id,
      consumed: 0,
      left: dailyRate,
      nOfNormal: 0,
      notAllowedProducts: notAllowedProductTitles,
      eatenFoods: [],
    });
  }
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
    notAllowedProducts: notAllowedProducts.map((p) => p.title),
  };
};
