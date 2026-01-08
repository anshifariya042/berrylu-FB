import React, { createContext, useContext, useState, useEffect } from "react";
import api, { mapId } from "../api/api";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Fetch cart and orders from backend on mount
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const [cartRes, ordersRes] = await Promise.all([
            api.get("/cart"),
            api.get("/orders"),
          ]);
          setCart(mapId(cartRes.data.items || []));
          setOrders(ordersRes.data || []);
        } catch (err) {
          console.error("Error fetching cart/orders:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem("cart");
      const savedOrders = localStorage.getItem("orders");
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Sync guest cart to localStorage
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, isLoggedIn]);

  // Add product
  const addToCart = async (product, selectedSize, quantity = 1) => {
    if (isLoggedIn) {
      try {
        const response = await api.post("/cart/add", {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.newPrice || product.price,
          size: selectedSize || "Free Size",
          quantity,
        });
        setCart(mapId(response.data.items || []));
        toast.success("Added to Cart", { id: "cart" });
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error("Failed to add to cart");
      }
    } else {
      const existingItem = cart.find(
        (item) => item.id === product.id && item.size === selectedSize
      );

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id && item.size === selectedSize
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart([
          ...cart,
          {
            ...product,
            size: selectedSize || "Free Size",
            quantity,
          },
        ]);
      }
      toast.success("Added to Cart", { id: "cart" });
    }
  };

  const removeFromCart = async (id, size) => {
    if (isLoggedIn) {
      try {
        const response = await api.delete(`/cart/remove/${id}`, { data: { size } });
        setCart(mapId(response.data.items || []));
        toast.success("Removed from Cart");
      } catch (err) {
        console.error("Error removing from cart:", err);
        toast.error("Failed to remove from cart");
      }
    } else {
      setCart(cart.filter((item) => !(item.id === id && item.size === size)));
      toast.success("Removed from Cart");
    }
  };

  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await api.delete("/cart/clear");
        setCart([]);
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    } else {
      setCart([]);
    }
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => {
      const rawPrice = item.price || item.newPrice || 0;
      const numericPrice = typeof rawPrice === "number"
        ? rawPrice
        : parseFloat(String(rawPrice).replace(/[^0-9.]/g, "")) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + numericPrice * quantity;
    }, 0);

  const placeOrder = async (shippingDetails, paymentMethod) => {
    if (cart.length === 0) return;

    if (isLoggedIn) {
      try {
        const response = await api.post("/orders/create", {
          items: cart,
          totalAmount: getCartTotal(),
          shippingAddress: shippingDetails.address,
          phone: shippingDetails.phone,
          paymentMethod: paymentMethod,
          user: currentUser?.fullName,
          userId: currentUser?.email,
          date: new Date().toLocaleString(),
        });
        setOrders((prev) => [...prev, response.data]);
        clearCart();
        toast.success("Order placed successfully!");
        return true;
      } catch (err) {
        console.error("Error placing order:", err);
        toast.error("Failed to place order");
        return false;
      }
    } else {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        totalAmount: getCartTotal(),
        user: "Guest",
        shippingAddress: shippingDetails.address,
        paymentMethod: paymentMethod,
      };

      setOrders((prev) => [...prev, newOrder]);
      clearCart();
      toast.success("Order placed successfully!");
      return true;
    }
  };

  const cancelOrder = async (id) => {
    if (isLoggedIn) {
      try {
        const response = await api.put(`/orders/cancel/${id}`);
        setOrders((prev) =>
          prev.map((order) => (order._id === id ? response.data : order))
        );
        toast.success("Order cancelled");
        return true;
      } catch (err) {
        console.error("Error cancelling order:", err);
        toast.error(err.response?.data?.message || "Failed to cancel order");
        return false;
      }
    } else {
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success("Order cancelled");
      return true;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        placeOrder,
        setOrders,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
