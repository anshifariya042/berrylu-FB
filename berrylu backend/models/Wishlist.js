const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                productId: {
                    type: String,
                    required: true,
                },
                name: String,
                image: String,
                price: Number,
                newPrice: String,
                oldPrice: String,
                uniqueId: String, 
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
