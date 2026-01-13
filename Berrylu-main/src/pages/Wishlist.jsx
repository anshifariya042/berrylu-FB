import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const { wishlist, removeFromWishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-8">
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 pt-10">
          {wishlist.map((item) => (
            <div
              key={item.uniqueId}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/product/${item.category}/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-60 h-64 object-cover mx-auto"
                />
              </Link>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-pink-600 font-medium">
                  {item.newPrice || item.price}
                </p>
                <p className="text-sm text-gray-500">{item.category}</p>

                <button
                  onClick={() => {
                    removeFromWishlist(item.uniqueId);
                    toast("Removed from wishlist");
                  }}
                  className="mt-3 px-3 py-2 bg-gray-200 rounded-md flex items-center gap-2 mx-auto"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
