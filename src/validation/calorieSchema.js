import joi from "joi";

export const getAllEattenFoodsSchema = joi.object({
  date: joi.date().iso(["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD"]).required(),
});

export const addEattenFoodSchema = joi.object({
  productId: joi.number().required().messages({
    "number.base": "Product ID must be a number",
    "any.required": "Product ID is required",
  }),
  weight: joi.number().required().messages({
    "number.base": "Weight must be a number",
    "any.required": "Weight is required",
  }),
});

export const removeEattenFoodSchema = joi.object({
  date: joi.date().iso(["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD"]).required(),
  id: joi.number().required().messages({
    "number.base": "ID must be a number",
    "any.required": "ID is required",
  }),
});
