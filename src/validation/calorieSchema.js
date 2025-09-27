import joi from "joi";

export const getAllEattenFoodsSchema = joi.object({
  date: joi
    .date()
    .iso(["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD"])
    .required(),
});
