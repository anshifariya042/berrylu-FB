// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";


// function Cart() {
//   const { cart, removeFromCart, clearCart } = useCart();
//   const navigate = useNavigate();

//   if (cart.length === 0)
//     return <div className="text-center py-20 text-xl">Your cart is empty 🛍️</div>;

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-6 mt-7">
//       <h1 className="text-3xl font-semibold mb-6 flex  justify-center mt-5">Cart</h1>

//       {cart.map((item, index) => (
//         <div
//           key={index}
//           className="flex justify-between items-center border-b py-4"
//         >
//           <div className="flex items-center gap-4">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-24 h-24 object-cover rounded-md"
//             />
//             <div>
//               <h2 className="font-semibold">{item.name}</h2>
//               <p className="text-sm text-gray-500">Size: {item.size}</p>
//               <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//               <p className="text-pink-600 font-semibold mt-1">
//                 {item.newPrice || item.price}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => removeFromCart(item.id, item.size)}
//             className="text-red-500 hover:underline"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
  


//       <div className="mt-6 flex justify-between items-center">
//         <button
//           onClick={clearCart}
//           className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
//         >
//           Clear Cart
//         </button>

//          <button
//           onClick={() => navigate("/payment")}
//           className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
//         >
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Cart;



import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate Subtotal (keeping logic local to UI)
  const subtotal = cart.reduce((acc, item) => acc + (item.newPrice || item.price) * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc]">
        <div className="text-6xl mb-4">🛍️</div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Your bag is empty</h2>
        <p className="text-gray-400 mt-2 mb-8">Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate("/shop")}
          className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all"
        >
          Start Shopping
        </button>
      </div>
    );

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">
            Shopping <span className="text-pink-600">Bag</span>
          </h1>
          <div className="h-1.5 w-16 bg-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-40 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-black text-gray-800 tracking-tight leading-tight">{item.name}</h2>
                      <p className="text-xl font-black text-gray-900">₹{(item.newPrice || item.price) * item.quantity}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="bg-gray-50 px-3 py-1 rounded-lg">
                        <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Size</span>
                        <span className="text-sm font-bold text-gray-700">{item.size}</span>
                      </div>
                      <div className="bg-gray-50 px-3 py-1 rounded-lg">
                        <span className="text-[10px] font-black uppercase text-gray-400 block tracking-widest">Quantity</span>
                        <span className="text-sm font-bold text-gray-700">{item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                    >
                      Remove Item
                    </button>
                    <p className="text-xs font-medium text-gray-400 italic">
                      Price per unit: ₹{item.newPrice || item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 ml-4"
            >
              <span className="text-lg"></span> Clear cart
            </button>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 sticky top-28">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-6 pb-4 border-b">Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 uppercase text-xs font-bold tracking-widest">Free</span>
                </div>
                <div className="pt-4 border-t flex justify-between items-baseline">
                  <span className="text-lg font-black text-gray-900 uppercase">Total</span>
                  <span className="text-3xl font-black text-pink-600 tracking-tighter">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/payment")}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300 shadow-xl shadow-gray-200 active:scale-95 mb-4"
              >
                Proceed to Checkout
              </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;