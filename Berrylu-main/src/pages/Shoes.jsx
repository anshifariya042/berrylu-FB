// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import toast from "react-hot-toast";
// import api, { mapId } from "../api/api";

// function Shoes() {
//   const { addToCart } = useCart();
//   const [shoeItems, setShoeItems] = useState([]);
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

//   useEffect(() => {
//     api.get("/products/category/shoes")
//       .then((response) => {
//         const updated = mapId(response.data).map((item) => ({
//           ...item,
//           uniqueId: item.id,
//         }));
//         setShoeItems(updated);
//       })
//       .catch((error) => console.error("Error fetching shoes:", error));
//   }, []);



//   const toggleWishlist = (item) => {
//     const id = item.uniqueId;

//     if (isInWishlist(id)) {
//       removeFromWishlist(id);
//       toast("Removed from Wishlist");
//     } else {
//       addToWishlist({ ...item, uniqueId: id });
//       toast.success("Added to Wishlist");
//     }
//   };

//   return (
//     <div className="py-20 bg-gray-50 min-h-screen mt-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
//         Shoes
//       </h1>
//       <p className="text-gray-700 text-center mb-10">
//         Step into style with our shoe collection!
//       </p>


//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
//         {shoeItems.map((item) => {
//           const inStock =
//             item.stock !== false;

//           return (
//             <div
//               key={item.id}
//               className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
//             >

//               {/* ❤️ Wishlist Icon */}
//               <button
//                 onClick={() => toggleWishlist(item)}
//                 className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-pink-50 transition"
//               >
//                 {isInWishlist(item.uniqueId) ? (
//                   <FaHeart size={22} color="red" />
//                 ) : (
//                   <FaRegHeart size={22} color="black" />
//                 )}
//               </button>

//               {/* 🏷️ Stock Badge */}
//               <div
//                 className={`absolute top-3 left-3 px-3 py-1 z-20 text-xs font-semibold rounded-full ${inStock
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//                   }`}
//               >
//                 {inStock ? "In Stock" : "Out of Stock"}
//               </div>

//               {/* 🖼️ Product Image */}
//               <div className="overflow-hidden">
//                 {inStock ? (
//                   <Link to={`/product/shoes/${item.id}`}>
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-80 h-80 object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                   </Link>

//                 ) : (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-80 h-80 object-cover"
//                   />
//                 )}
//               </div>

//               {/* 📦 Product Details */}
//               <div className="p-4 text-center flex flex-col justify-between">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {item.name}
//                 </h2>

//                 <div className="flex justify-center gap-2 mt-1">
//                   {item.oldPrice && (
//                     <p className="text-gray-400 line-through text-sm">
//                       ₹{item.oldPrice}
//                     </p>
//                   )}
//                   <p className="text-pink-600 font-medium">
//                     ₹{item.newPrice || item.price}
//                   </p>
//                 </div>

//                 {/* 🛒 Add to Cart */}
//                 {inStock ? (
//                   <button
//                     onClick={() => {
//                       addToCart(item, "Free Size", 1);
//                     }}
//                     className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
//                   >
//                     Add to Cart
//                   </button>
//                 ) : (
//                   <button
//                     disabled
//                     className="mt-3 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
//                   >
//                     Out of Stock
//                   </button>
//                 )}
//               </div>
//             </div>

//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Shoes;




import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

function Shoes() {
  const { addToCart } = useCart();
  const [shoeItems, setShoeItems] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    api.get("/products/category/shoes")
      .then((response) => {
        const updated = mapId(response.data).map((item) => ({
          ...item,
          uniqueId: item.id,
        }));
        setShoeItems(updated);
      })
      .catch((error) => console.error("Error fetching shoes:", error));
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
    <div className="py-24 bg-[#fcfcfc] min-h-screen">
      {/* 🌟 Header Section */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-3xl font-black text-pink-600 mb-4 tracking-tighter uppercase italic">
          shoe collection
        </h1>
        <p className="text-gray-400 font-medium tracking-wide max-w-md mx-auto">
          Step into style with our curated footwear.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {shoeItems.map((item) => {
          const inStock = item.stock !== false;

          return (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              {/* ❤️ Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
              >
                {isInWishlist(item.uniqueId) ? (
                  <FaHeart size={20} className="text-red-500 animate-pulse" />
                ) : (
                  <FaRegHeart size={20} className="text-gray-400" />
                )}
              </button>

              {/* 🏷️ Stock Badge */}
              <div
                className={`absolute top-6 left-6 px-3 py-1 z-20 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm ${
                  inStock ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
                }`}
              >
                {inStock ? "in stock" : "Sold Out"}
              </div>

              {/* 🖼️ Product Image */}
              <div className="relative overflow-hidden aspect-[4/5]">
                {inStock ? (
                  <Link to={`/product/shoes/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                ) : (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale opacity-60"
                  />
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
                    <p className="text-sm text-gray-400 line-through">
                      ₹{item.oldPrice}
                    </p>
                  )}
                </div>

                {/* 🛒 Add to Cart */}
                <button
                  onClick={() => addToCart(item, "Free Size", 1)}
                  disabled={!inStock}
                  className={`mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 ${
                    inStock
                      ? "bg-gray-900 text-white hover:bg-pink-600 shadow-xl shadow-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {inStock ? "Add to cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shoes;