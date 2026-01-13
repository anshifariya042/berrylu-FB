import express from "express";
import {
  getDashboardStats
} from "../controllers/admin/dashboardController.js";

import {
  getAllUsers,
  updateUser
} from "../controllers/admin/usersController.js";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/admin/productsController.js";

import {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/admin/ordersController.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);

// Products
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Orders
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
