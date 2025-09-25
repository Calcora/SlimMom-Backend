import Product from "../db/models/product.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getProducts = async () => {
  return await Product.find();
};

export const filteredProducts = async (query) => {
  const filter = parseFilterParams(query);
  return await Product.find(filter);
};
