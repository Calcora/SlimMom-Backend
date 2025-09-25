import express from "express";
import {
  filteredProductsController,
  getProductsController,
} from "../controllers/productController.js";

const productsRouter = express.Router();

productsRouter.get("/", getProductsController);

productsRouter.get("/search", filteredProductsController);

export default productsRouter;
