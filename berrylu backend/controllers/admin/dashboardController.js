import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const getDashboardStats = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const productsCount = await Product.countDocuments();
  const orders = await Order.find();
const ordersCount = await Order.countDocuments();
const cancelledCount = await Order.countDocuments({ status: "cancelled" });

const revenueResult = await Order.aggregate([
  { $group: { _id: null, total: { $sum: "$totalAmount" } } }
]);

const totalRevenue = revenueResult[0]?.total || 0;


  res.status(200).json({
    users: usersCount,
    products: productsCount,
    orders: ordersCount,
    cancelled: cancelledCount,
    revenue: totalRevenue,
  });
});
