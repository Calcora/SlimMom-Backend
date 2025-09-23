import { getProducts } from "../services/productService.js";

// Controller to handle fetching products

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error("❌ Fetch products error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
