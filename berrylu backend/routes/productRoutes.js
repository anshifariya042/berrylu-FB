const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  getProductById,
} = require("../controllers/productController");

router.get("/products", getAllProducts);
router.get("/products/category/:category", getProductsByCategory);
router.get("/products/:id", getProductById);

module.exports = router;
