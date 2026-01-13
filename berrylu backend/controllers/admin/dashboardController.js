import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Dashboard stats for frontend
export const getDashboardStats = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const productsCount = await Product.countDocuments();
  const orders = await Order.find();
  const ordersCount = orders.length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  res.status(200).json({
    users: usersCount,
    products: productsCount,
    orders: ordersCount,
    cancelled: cancelledCount,
    revenue: totalRevenue,
  });
});
