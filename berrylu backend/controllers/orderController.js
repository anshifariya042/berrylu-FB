const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = asyncHandler(async (req, res) => {
        const orders = await Order.find({ userId: req.user.email });
        res.json(orders);
   
});

// Get single order
exports.getOrderById = asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (!order || order.userId !== req.user.email) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
   
});

// (Checkout)
exports.createOrder = asyncHandler(async (req, res) => {
        const orderData = { ...req.body, userId: req.user.email, user: req.user.name };
        const order = new Order(orderData);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
   
});

// Cancel Order
exports.cancelOrder = asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (!order || order.userId !== req.user.email) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.status !== "pending") {
            return res.status(400).json({ message: `Order cannot be cancelled in ${order.status} status` });
        }
        order.status = "cancelled";
        await order.save();
        res.json(order);
    
});


