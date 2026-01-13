import Order from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// Get order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.status(200).json(order);
});

// Update order status
export const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedOrder);
});

// Delete order
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.status(200).json({ message: "Order deleted successfully" });
});
