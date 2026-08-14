import express from "express";
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  // searchProducts
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/category/:category", getProductsByCategory);
// router.get("/products/search", searchProducts);
router.get("/products/:id", getProductById);


export default router;
