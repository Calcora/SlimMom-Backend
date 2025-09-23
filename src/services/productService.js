import Product from "../db/models/product.js";

export const getProducts = async () => {
  return await Product.find();
};
