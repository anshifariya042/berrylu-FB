const asyncHandler = require("../utils/asyncHandler");
const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
 
});

// GET PRODUCTS BY CATEGORY
exports.getProductsByCategory =asyncHandler( async (req, res) => {
    const products = await Product.find({
      category: req.params.category,
    });
    res.json(products);
 
});

// GET SINGLE PRODUCT
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
 
});
