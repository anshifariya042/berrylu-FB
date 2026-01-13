import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    category: req.params.category,
  });
  res.json(products);
});

// GET SINGLE PRODUCT
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});
