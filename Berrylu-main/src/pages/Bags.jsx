import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

function Bags() {
  const { addToCart } = useCart();
  const [bagItems, setBagItems] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    api.get("/products/category/bags")
      .then((response) => {
        const updated = mapId(response.data).map((item) => ({
          ...item,
          uniqueId: item.id,
        }));
        setBagItems(updated);
      })
      .catch((error) => console.error("Error fetching bags:", error));
  }, []);

  const toggleWishlist = (item) => {
    const id = item.uniqueId;

    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast("Removed from Wishlist");
    } else {
      addToWishlist({ ...item, uniqueId: id });
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen mt-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Bags</h1>
      <p className="text-gray-700 text-center mb-10">
        Find trendy and stylish bags here!
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {bagItems.map((item) => {
          const inStock =
            item.stock !== false;

          return (
            <div
              key={item.id}
              className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              {/* ❤️ Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-pink-50 transition"
              >
                {isInWishlist(item.uniqueId) ? (
                  <FaHeart size={22} color="red" />
                ) : (
                  <FaRegHeart size={22} color="black" />
                )}
              </button>

              {/* 🏷️ Stock Badge */}
              <div
                className={`absolute top-3 left-3 px-3 py-1 z-20 text-xs font-semibold rounded-full ${inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </div>

              {/* 🖼️ Product Image */}
              {inStock ? (
                <Link to={`/product/bags/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-80 h-80 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              ) : (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-80 h-80 object-cover"
                />
              )}

              {/* 📦 Product Details */}
              <div className="p-4 text-center flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                <div className="flex justify-center gap-2 mt-1">
                  {item.oldPrice && (
                    <p className="text-gray-400 line-through text-sm">
                      ₹{item.oldPrice}
                    </p>
                  )}
                  <p className="text-pink-600 font-medium">
                    ₹{item.newPrice || item.price}
                  </p>
                </div>

                {/* 🛒 Add to Cart */}
                {inStock ? (
                  <button
                    onClick={() => {
                      addToCart(item, "Free Size", 1);
                    }}
                    className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-3 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bags;
