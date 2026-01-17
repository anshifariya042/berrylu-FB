// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import toast from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";

// function Wishlist() {
//   const { wishlist, removeFromWishlist, fetchWishlist } = useWishlist();

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   return (
//     <div className="p-8">
//       {wishlist.length === 0 ? (
//         <p className="text-center text-gray-600">Your wishlist is empty!</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 pt-10">
//           {wishlist.map((item) => (
//             <div
//               key={item.uniqueId}
//               className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
//             >
//               <Link to={`/product/${item.category}/${item.productId}`}>
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-60 h-64 object-cover mx-auto"
//                 />
//               </Link>

//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-semibold">{item.name}</h2>
//                 <p className="text-pink-600 font-medium">
//                   {item.newPrice || item.price}
//                 </p>
//                 <p className="text-sm text-gray-500">{item.category}</p>

//                 <button
//                   onClick={() => {
//                     removeFromWishlist(item.uniqueId);
//                     toast("Removed from wishlist");
//                   }}
//                   className="mt-3 px-3 py-2 bg-gray-200 rounded-md flex items-center gap-2 mx-auto"
//                 >
//                   <FaTrash /> Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const { wishlist, removeFromWishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="py-24 bg-[#fcfcfc] min-h-screen">
      {/* 🌟 Header Section */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-3xl md:text-3xl font-black text-pink-600 mb-4 tracking-tighter uppercase italic">
       your favourites
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="text-6xl mb-6 opacity-20">🖤</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">
              Your wishlist is currently empty
            </p>
            <Link
              to="/shop"
              className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map((item) => (
              <div
                key={item.uniqueId}
                className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                {/* 🗑️ Remove Button */}
                <button
                  onClick={() => {
                    removeFromWishlist(item.uniqueId);
                    toast("Removed from favorites");
                  }}
                  className="absolute top-5 right-5 z-20 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove from wishlist"
                >
                  <FaTrash size={16} />
                </button>

                {/* 🖼️ Product Image */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Link to={`/product/${item.category}/${item.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                </div>

                {/* 📦 Product Details */}
                <div className="p-8 text-center flex flex-col flex-grow">
                  <span className="text-[10px] font-black uppercase text-pink-600 tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  
                  <h2 className="text-lg font-bold text-gray-800 mb-3 truncate group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h2>

                  <p className="text-2xl font-black text-gray-900 mb-6 tracking-tighter">
                    ₹{item.newPrice || item.price}
                  </p>

                  <Link
                    to={`/product/${item.category}/${item.productId}`}
                    className="mt-auto w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300 shadow-xl shadow-gray-200 active:scale-95"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;