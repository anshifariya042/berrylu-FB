const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["western", "bags", "shoes"],
        },
        image: {
            type: String,
            required: true,
        },
        oldPrice: {
            type: Number,
        },
        newPrice: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        sizes: {
            type: [String],
            default: [],
        },
        // Using Object to allow flexible details structure (color, material, etc.)
        details: {
            type: Object,
            default: {}
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
