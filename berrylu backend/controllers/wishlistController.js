const Wishlist = require("../models/Wishlist");

// Get Wishlist
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(`[GET Wishlist] User: ${userId}`);
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            console.log("[GET Wishlist] No wishlist found.");
            return res.status(200).json([]);
        }
        console.log(`[GET Wishlist] Found ${wishlist.items.length} items.`);
        res.status(200).json(wishlist.items);
    } catch (error) {
        console.error("[GET Wishlist] Error:", error);
        res.status(500).json({ message: "Error fetching wishlist", error });
    }
};

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const item = req.body; 
        console.log(`[ADD Wishlist] User: ${userId}, Item: ${item.name} (${item.id || item.productId})`);

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                items: [],
            });
        }

        const itemId = item.id || item.productId;
        const uniqueId = item.uniqueId || item.id;

        const exists = wishlist.items.some(
            (i) => i.productId === itemId || i.uniqueId === uniqueId
        );

        if (!exists) {
            console.log("[ADD Wishlist] Item not found, adding...");
            wishlist.items.push({
                ...item,
                productId: itemId, 
                uniqueId: uniqueId,
            });
            await wishlist.save();
        } else {
            console.log("[ADD Wishlist] Item already exists.");
        }

        res.status(200).json(wishlist.items);
    } catch (error) {
        console.error("[ADD Wishlist] Error:", error);
        res.status(500).json({ message: "Error adding to wishlist", error });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { uniqueId } = req.params;
        console.log(`[REMOVE Wishlist] User: ${userId}, Target ID: ${uniqueId}`);

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) return res.status(200).json([]);

        const initialLength = wishlist.items.length;
        wishlist.items = wishlist.items.filter((i) => i.uniqueId !== uniqueId && i.productId !== uniqueId);

        if (wishlist.items.length !== initialLength) {
            console.log(`[REMOVE Wishlist] Removed item. New count: ${wishlist.items.length}`);
            await wishlist.save();
        } else {
            console.log(`[REMOVE Wishlist] Item not found to remove.`);
        }

        res.status(200).json(wishlist.items);
    } catch (error) {
        console.error("[REMOVE Wishlist] Error:", error);
        res.status(500).json({ message: "Error removing from wishlist", error });
    }
};
