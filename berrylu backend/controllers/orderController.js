const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.email });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order || order.userId !== req.user.email) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// (Checkout)
exports.createOrder = async (req, res) => {
    try {
        const orderData = { ...req.body, userId: req.user.email, user: req.user.name };
        const order = new Order(orderData);
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


