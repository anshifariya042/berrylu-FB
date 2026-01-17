// import React from "react";
// import { Link } from "react-router-dom";

// function ThankYou() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
//       <p className="text-gray-700 mb-6">Thank you for your order!</p>
//       <Link
//         to="/shop"
//         className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// }

// export default ThankYou;



import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc] px-6">
      {/* Celebration Card */}
      <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-pink-100/50 text-center max-w-2xl border border-gray-50 relative overflow-hidden">
        
        {/* Animated Background Element */}
       
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter uppercase italic">
          Payment <span className="text-emerald-500">Successful!</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-10 leading-relaxed">
          Thank you for choosing <span className="text-pink-600 font-bold">Berrylu</span>. 
          Your order has been placed and is being prepared with care!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300 shadow-xl active:scale-95"
          >
            Track Order
          </Link>
          
          <Link
            to="/shop"
            className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all duration-300 active:scale-95"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Decorative Tag */}
        <p className="mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em]">
          Berrylu Luxury Fashion 
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
