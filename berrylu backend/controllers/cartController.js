const Cart = require("../models/Cart");

//  ADD TO CART
exports.addToCart = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Add to cart failed", error });
  }
};

//  GET USER CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Fetch cart failed", error });
  }
};

//  UPDATE QUANTITY
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

//  REMOVE ITEM
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.id
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Remove failed", error });
  }
};

//  CLEAR CART
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] }
    );
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Clear cart failed", error });
  }
};
