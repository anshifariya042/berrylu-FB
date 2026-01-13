import express from "express";

// import {
//   addToCart,
//   getCart,
//   updateCartItem,
//   removeCartItem,
//   clearCart,
// } from "../controllers/cartController.js";

import {
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
} from "../controllers/orderController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Cart routes
// router.post("/cart/add", protect, addToCart);
// router.get("/cart", protect, getCart);
// router.put("/cart/update", protect, updateCartItem);
// router.delete("/cart/remove/:id", protect, removeCartItem);
// router.delete("/cart/clear", protect, clearCart);

// Order routes
router.get("/orders", protect, getAllOrders);
router.get("/orders/:id", protect, getOrderById);
router.post("/orders/create", protect, createOrder);
router.put("/orders/cancel/:id", protect, cancelOrder);

export default router;
