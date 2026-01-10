const asyncHandler = require("../utils/asyncHandler");
const Wishlist = require("../models/Wishlist");

// Get Wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        console.log(`[GET Wishlist] User: ${userId}`);
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            console.log("[GET Wishlist] No wishlist found.");
            return res.status(200).json([]);
        }
        console.log(`[GET Wishlist] Found ${wishlist.items.length} items.`);
        res.status(200).json(wishlist.items);
   
});

// Add to Wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
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
  
});

// Remove from Wishlist
exports.removeFromWishlist = asyncHandler(async (req, res) => {
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
    
});
