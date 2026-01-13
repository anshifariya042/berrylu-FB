import React, { createContext, useContext, useState } from "react";
import api from "../api/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from DB
  const fetchWishlist = async () => {
    const res = await api.get("/wishlist");
    setWishlist(res.data);
  };

  // Add item
  const addToWishlist = async (item) => {
    const res = await api.post("/wishlist/add", item);
    setWishlist(res.data);
  };

  // Remove item
  const removeFromWishlist = async (uniqueId) => {
    const res = await api.delete(`/wishlist/remove/${uniqueId}`);
    setWishlist(res.data);
  };

  const isInWishlist = (uniqueId) => {
    return wishlist.some((i) => i.uniqueId === uniqueId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
