// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";
// import api, { mapId } from "../api/api";

// function ProductDetails() {
//   const { category, id } = useParams();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     api.get(`/products/${id}`)
//       .then((res) => {
//         const mappedProduct = mapId(res.data);
//         setProduct(mappedProduct);
//         setSelectedSize(mappedProduct.sizes ? mappedProduct.sizes[0] : null);
//       })
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   // ✅ Check stock status (default true if not defined)
//   const inStock = product.inStock !== false;

//   return (
//     <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-20 gap-10">
//       {/* 🖼️ Product Image */}
//       <div className="flex justify-center md:w-1/2">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="rounded-lg shadow-lg object-cover w-full max-w-md"
//         />
//       </div>

//       {/* 📄 Product Info */}
//       <div className="md:w-1/2 max-w-lg">
//         <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

//         <div className="flex items-center gap-3 mt-3">
//           {product.oldPrice && (
//             <p className="text-gray-500 line-through text-lg">
//               ₹{product.oldPrice}
//             </p>
//           )}
//           <p className="text-pink-600 font-bold text-2xl">
//             ₹{product.newPrice}
//           </p>
//         </div>

//         {/* 🏷️ Stock Status */}
//         <p
//           className={`mt-3 font-medium ${inStock ? "text-green-600" : "text-red-500"
//             }`}
//         >
//           {inStock ? "In Stock " : "Out of Stock "}
//         </p>

//         {/* 🧵 Sizes */}
//         {product.sizes && (
//           <div className="mt-6">
//             <p className="text-gray-800 mb-2 font-medium">Size</p>
//             <div className="flex flex-wrap gap-3">
//               {product.sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   disabled={!inStock}
//                   className={`px-5 py-2 border rounded-full transition ${selectedSize === size
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700"
//                     } ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* 📜 Product Details */}
//         {product.details && (
//           <div className="mt-8">
//             <h3 className="text-gray-800 mb-3 font-semibold text-lg">
//               Product Details
//             </h3>
//             <ul className="text-gray-800 space-y-1">
//               {Object.entries(product.details).map(([key, value]) => (
//                 <li key={key}>
//                   <span className="font-medium capitalize">{key}:</span>{" "}
//                   {value}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* 🔢 Quantity */}
//         {inStock && (
//           <div className="mt-6">
//             <p className="text-gray-800 mb-2 font-medium">Quantity</p>
//             <div className="flex items-center border rounded-md w-36">
//               <button
//                 onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//                 className="px-3 py-2 border-r text-lg"
//               >
//                 –
//               </button>
//               <span className="flex-1 text-center text-lg">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="px-3 py-2 border-l text-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         )}

//         {/* 🛍️ Buttons */}
//         <div className="mt-8 space-y-3">
//           <button
//             onClick={() => {
//               if (!inStock) return;
//               addToCart(product, selectedSize, quantity);
//             }}
//             disabled={!inStock}
//             className={`w-full border border-gray-800 py-3 rounded-md transition ${inStock
//               ? "text-gray-800 hover:bg-gray-100"
//               : "text-gray-400 bg-gray-100 cursor-not-allowed"
//               }`}
//           >
//             {inStock ? "Add to Cart" : "Out of Stock"}
//           </button>

//           <button
//             onClick={() => {
//               if (!inStock) return;
//               addToCart(product, selectedSize, quantity);
//               navigate("/payment");
//             }}
//             disabled={!inStock}
//             className={`w-full py-3 rounded-md font-medium transition ${inStock
//               ? "bg-pink-600 text-white hover:bg-pink-700"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//           >
//             {inStock ? "Buy it Now" : "Unavailable"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

function ProductDetails() {
  const { category, id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => {
        const mappedProduct = mapId(res.data);
        setProduct(mappedProduct);
        setSelectedSize(mappedProduct.sizes ? mappedProduct.sizes[0] : null);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
      <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const inStock = product.inStock !== false;

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        {/* 🖼️ Product Image Section */}
        <div className="w-full lg:w-3/5">
          <div className="sticky top-28 bg-white p-4 rounded-[3rem] shadow-xl shadow-gray-100 overflow-hidden border border-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-[2.5rem] object-cover w-full aspect-[4/5] lg:aspect-auto lg:h-[700px] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* 📄 Product Info Section */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                {category || "Collection"}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${inStock ? "text-emerald-500" : "text-red-400"}`}>
                {inStock ? "● In Stock" : "○ Sold Out"}
              </span>
            </div>
            
            <h1 className="text-1xl md:text-2xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <p className="text-xl font-black text-gray-900 tracking-tighter">
                ₹{product.newPrice || product.price}
              </p>
              {product.oldPrice && (
                <p className="text-xl text-gray-400 line-through font-medium">
                  ₹{product.oldPrice}
                </p>
              )}
            </div>
          </div>

          {/* 🧵 Sizes */}
          {product.sizes && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Size</p>
                <button className="text-[10px] font-bold text-gray-400 underline uppercase tracking-widest hover:text-pink-600 transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!inStock}
                    className={`h-12 w-12 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center border-2 ${
                      selectedSize === size
                        ? "bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-200"
                        : "bg-white border-gray-100 text-gray-600 hover:border-pink-200"
                    } ${!inStock ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🔢 Quantity Picker */}
          {inStock && (
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Quantity</p>
              <div className="flex items-center bg-white border border-gray-100 rounded-2xl w-fit p-1 shadow-sm">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400 text-xl font-light transition-colors"
                >
                  –
                </button>
                <span className="w-12 text-center font-black text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-400 text-xl font-light transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* 🛍️ Action Buttons */}
          <div className="mt-10 space-y-4">
            <button
              onClick={() => {
                if (!inStock) return;
                addToCart(product, selectedSize, quantity);
              }}
              disabled={!inStock}
              className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 transform active:scale-95 ${
                inStock
                  ? "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  : "bg-gray-100 text-gray-400 border-transparent cursor-not-allowed"
              }`}
            >
              Add to cart
            </button>

            <button
              onClick={() => {
                if (!inStock) return;
                addToCart(product, selectedSize, quantity);
                navigate("/payment");
              }}
              disabled={!inStock}
              className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 transform active:scale-95 shadow-xl ${
                inStock
                  ? "bg-pink-600 text-white hover:bg-pink-700 shadow-pink-100"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {inStock ? "Buy it Now" : "Currently Unavailable"}
            </button>
          </div>

          {/* 📜 Product Details Accordion-style */}
          {product.details && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="block text-[10px] font-black uppercase text-gray-300 tracking-widest">{key}</span>
                    <span className="text-sm font-bold text-gray-700 capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;