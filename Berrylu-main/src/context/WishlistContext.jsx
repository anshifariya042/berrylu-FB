import React,{createContext,useContext,useState} from 'react'

const WishlistContext=createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };

  const removeFromWishlist = (uniqueId) => {
    setWishlist((prev) => prev.filter((i) => i.uniqueId !== uniqueId));
  };

  const isInWishlist = (uniqueId) => {
    return wishlist.some((i) => i.uniqueId === uniqueId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist=()=>useContext(WishlistContext);
