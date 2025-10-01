import joi from "joi";

export const getAllEattenFoodsSchema = joi.object({
  date: joi.date().iso(["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD"]).required(),
});

export const addEattenFoodSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  weight: joi.number().required().messages({
    "number.base": "Weight must be a number",
    "any.required": "Weight is required",
  }),
});

export const removeEattenFoodSchema = joi.object({
  date: joi.date().iso(["YYYY/MM/DD", "DD-MM-YYYY", "YYYY-MM-DD"]).required(),
  id: joi
    .number()
    .required()
    .messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
});
