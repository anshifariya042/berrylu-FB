import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Get product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

// Create product
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Update product
// export const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
//   res.status(200).json(updatedProduct);
// });


export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(updatedProduct);
});


// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully" });
});
