const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true,
        },
        user: {
            type: String,
        },
        items: [
            {
                id: String,
                name: String,
                price: Number,
                quantity: Number,
                size: String,
                image: String,
                newPrice: String,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            default: "cod",
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending", // pending, shipped, delivered, cancelled
        },
        date: {
            type: String, // Storing date string from frontend or generating here
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
 

