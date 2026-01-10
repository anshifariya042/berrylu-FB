const asyncHandler=require("../utils/asyncHandler")
const Cart = require("../models/Cart");

//  ADD TO CART
exports.addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, name, image, price, size, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        name,
        image,
        price,
        size,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json(cart);

});

//  GET USER CART
exports.getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    res.status(200).json(cart || { items: [] });
  
});

//  UPDATE QUANTITY
exports.updateCartItem = asyncHandler(async (req, res) => {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);

});

//  REMOVE ITEM
exports.removeCartItem = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.id
    );

    await cart.save();
    res.status(200).json(cart);
 
});

//  CLEAR CART
exports.clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );
    res.status(200).json({ message: "Cart cleared" });
 
});
