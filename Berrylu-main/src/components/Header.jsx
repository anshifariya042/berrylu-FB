import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import api, { mapId } from "../api/api";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ Fetch all products on load
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const products = mapId(res.data).map(item => ({
          ...item,
          uniqueId: item.id
        }));
        setAllProducts(products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Filter search results
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchTerm, allProducts]);

  const handleSelectProduct = (product) => {
    setSearchTerm("");
    setFilteredResults([]);
    navigate(`/product/${product.category}/${product.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-[50]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 px-5 relative space-y-3 md:space-y-0 ">

        {/* LOGO + MENU BUTTON */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <div
            onClick={() => navigate("/")}
            className="text-3xl font-bold font-serif text-pink-600 cursor-pointer"
          >
            Berrylu
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden text-2xl text-pink-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* ✅ SEARCH BAR */}
        <div className="relative w-full  md:w-64 flex items-center gap-2 mb-3 mt-4">
          <FaSearch size={20} className=" absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-full pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />

          {searchTerm.trim() !== "" && (
         <div className="absolute top-10 left-0 w-full bg-white border rounded-md shadow-md z-50 max-h-64 overflow-y-auto">
    
    {filteredResults.length > 0 ? (
      filteredResults.map((item) => (
        <div
          key={item.uniqueId}
          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelectProduct(item)}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 rounded-md mr-2 object-cover"
          />
          <span className="text-gray-700 text-sm">{item.name}</span>
        </div>
      ))
    ) : (
      <div className="p-3 text-center text-gray-500 text-sm">
         No products found
      </div>
    )}

  </div>
)}

        </div>

        {/* NAVIGATION LINKS */}
        <nav
          className={`${menuOpen
            ? "flex flex-col w-full bg-gray-50 shadow-md p-4 space-y-4 z-[40] mt-2"
            : "hidden md:flex"
            } md:flex md:space-x-8 font-medium text-sm`}
        >
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
            Home
          </Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
            Shop
          </Link>
          <Link to="/category" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
            Category
          </Link>
          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="hover:text-pink-500"
          >
            My Orders
          </Link>

          <div className="flex space-x-5 items-center md:hidden">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              <AiOutlineHeart className="text-xl text-pink-600" />
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <BsCart2 className="text-xl text-pink-600" />
            </Link>
          </div>

          {currentUser ? (

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">

              <span className="text-gray-700 font-medium">
                 {currentUser?.name || "User"}
                  </span>


              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-pink-600 text-white px-3 py-1 rounded-md hover:bg-pink-700 transition"
              >
                Logout
              </button>
            </div>

          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-2 hover:text-pink-500"
            >
              <VscAccount className="text-lg" />
              <span>Login</span>
            </Link>
          )}

        </nav>



        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-sm px-10">
          <Link to="/wishlist" className="hover:text-pink-600">
            <AiOutlineHeart className="text-lg" />
          </Link>
          <Link to="/cart" className="hover:text-pink-600">
            <BsCart2 className="text-xl" />
          </Link>
        </div>
      </div>
    </header>

  );
}

export default Header;
