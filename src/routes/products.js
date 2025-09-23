import { Router } from "express";

const productsRouter = Router();

// Controllers
import { getProductsController } from "../controllers/productController.js";


productsRouter.get("/", getProductsController);
