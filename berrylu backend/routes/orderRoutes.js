const express = require("express");
const router = express.Router();
const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");
const {
    getAllOrders,
    getOrderById,
    createOrder,
    cancelOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// Cart routes (separate from order creation but related)
router.post("/cart/add", protect, addToCart);
router.get("/cart", protect, getCart);
router.put("/cart/update", protect, updateCartItem);
router.delete("/cart/remove/:id", protect, removeCartItem);
router.delete("/cart/clear", protect, clearCart);

// Orders
router.get("/orders", protect, getAllOrders);
router.get("/orders/:id", protect, getOrderById);
router.post("/orders/create", protect, createOrder);
router.put("/orders/cancel/:id", protect, cancelOrder);

module.exports = router;
