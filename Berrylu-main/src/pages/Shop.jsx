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
          uniqueId: item.id 
        }));
        setAllItems(products);
        setFilteredItems(products);
      })
      .catch((err) => console.error("Error fetching shop data:", err));
  }, []);

  // Handle Filter + Sort
  useEffect(() => {
    let items = [...allItems];
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (sortOrder === "low-high") {
      items.sort((a, b) => (a.newPrice || a.price) - (b.newPrice || b.price));
    } else if (sortOrder === "high-low") {
      items.sort((a, b) => (b.newPrice || b.price) - (a.newPrice || a.price));
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
    <div className="py-24 bg-[#fcfcfc] min-h-screen">
      {/* 🌟 Header Section */}
      <div className="text-center mb-12 px-6">        
      </div>

      {/* 🛠️ Filter + Sorting Bar */}
      <div className="max-w-7xl mx-auto mb-12 px-6">
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 hidden sm:block">Filter By:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border-none rounded-xl px-6 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-pink-500 transition-all outline-none cursor-pointer w-full md:w-48"
            >
              <option value="all">All Categories</option>
              <option value="western">Western Wear</option>
              <option value="bags"> Bags</option>
              <option value="shoes">Footwear</option>
            </select>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:block">Sort By:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-50 border-none rounded-xl px-6 py-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-pink-500 transition-all outline-none cursor-pointer w-full md:w-48"
            >
              <option value="none">Default Sorting</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {currentItems.map((item) => {
          const inStock = item.inStock !== false;

          return (
            <div
              key={item.uniqueId}
              className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              {/* ❤️ Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
              >
                {isInWishlist(item.uniqueId) ? (
                  <FaHeart size={18} className="text-red-500" />
                ) : (
                  <FaRegHeart size={18} className="text-gray-400" />
                )}
              </button>

              {/* 🏷️ Category Tag */}
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-gray-900/10 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* 🖼️ Product Image */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <Link to={`/product/${item.category}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!inStock && 'grayscale opacity-50'}`}
                  />
                </Link>
                {!inStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Sold Out</span>
                  </div>
                )}
              </div>

              {/* 📦 Product Details */}
              <div className="p-6 text-center flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-pink-600 transition-colors">
                  {item.name}
                </h2>

                <div className="flex justify-center items-center gap-3 mb-6">
                  <p className="text-2xl font-black text-gray-900">
                    ₹{item.newPrice || item.price}
                  </p>
                  {item.oldPrice && (
                    <p className="text-sm text-gray-400 line-through font-medium">
                      ₹{item.oldPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => inStock && addToCart(item)}
                  disabled={!inStock}
                  className={`mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 ${
                    inStock
                      ? "bg-gray-900 text-white hover:bg-pink-600 shadow-xl shadow-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {inStock ? "Add to cart" : "Notify Me"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16 space-x-3">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`w-12 h-12 rounded-2xl font-black text-xs transition-all duration-300 transform active:scale-90 ${
                currentPage === index + 1
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                  : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;