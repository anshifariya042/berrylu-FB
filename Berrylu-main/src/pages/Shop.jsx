import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import api, { mapId } from "../api/api";

function Shop() {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Fetch data
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const products = mapId(res.data).map(item => ({
          ...item,
          uniqueId: item.id // Use MongoDB _id as uniqueId
        }));

        // const shuffled = products.sort(() => Math.random() - 0.5);
        setAllItems(products);
        setFilteredItems(products);
      })
      .catch((err) => console.error("Error fetching shop data:", err));
  }, []);

  // Handle Filter + Sort
  useEffect(() => {
    let items = [...allItems];

    // Category filter
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Sorting
    if (sortOrder === "low-high") {
      items.sort(
        (a, b) => (a.newPrice || a.price) - (b.newPrice || b.price)
      );
    } else if (sortOrder === "high-low") {
      items.sort(
        (a, b) => (b.newPrice || b.price) - (a.newPrice || a.price)
      );
    }

    setFilteredItems(items);
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, allItems]);

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

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-20 bg-gray-50 min-h-screen mt-8">
      {/*  Filter + Sorting Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto mb-6 px-6 gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="western">Western</option>
          <option value="bags">Bags</option>
          <option value="shoes">Shoes</option>
        </select>

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="none">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {currentItems.map((item) => {
          const inStock = item.inStock !== false;

          return (
            <div
              key={item.uniqueId}
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
              <Link to={`/product/${item.category}/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-80 h-80 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>

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

                <p className="text-sm text-gray-500">{item.category}</p>

                {/* 🛒 Add to Cart */}
                {inStock ? (
                  <button
                    onClick={() => {
                      addToCart(item);
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

      {/* 📄 Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-full ${currentPage === index + 1
              ? "bg-pink-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Shop;
