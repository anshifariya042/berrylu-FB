// import React from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// function Home() {
//   return (
//     <>
//       <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
//         {/* Background image */}
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-cover bg-center sm:bg-[center_top] transition-all duration-500"
//           style={{
//             backgroundImage:
//               "url('https://img.freepik.com/free-photo/young-woman-with-shopping-bags-beautiful-dress-hat_1303-17524.jpg?t=st=1762232036~exp=1762235636~hmac=510977942aec0118d12c372231d5f3b1cb3e44551f4114bdf8bed2c7ae47e5dc&w=1060')",
//           }}
//         ></div>

//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* Text + Button */}
//         <div className="relative z-10 text-center text-white px-6">
//           <h2 className="text-4xl md:text-6xl font-bold mb-4">Bestsellers of <span className="text-pink-300">Berrylu</span> </h2>
//           <p className="text-lg md:text-xl mb-6">
//             Discover the latest trends in fashion, beauty, and lifestyle.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-block px-10 py-3 bg-pink-600 text-white text-lg font-semibold hover:bg-pink-700 transition-transform transform hover:scale-105 rounded-md"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center sm:bg-[center_top] transition-all duration-700 scale-105"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/young-woman-with-shopping-bags-beautiful-dress-hat_1303-17524.jpg?t=st=1762232036~exp=1762235636~hmac=510977942aec0118d12c372231d5f3b1cb3e44551f4114bdf8bed2c7ae47e5dc&w=1060')",
          }}
        ></div>

        {/* Overlay - Slightly darker for better text readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

        {/* Text + Button */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h2 className="text-5xl md:text-5xl font-black mb-6 tracking-tighter leading-tight ">
            Best sellers of <span className="text-pink-500 drop-shadow-md">Berrylu</span> 
          </h2>
          <p className="text-lg md:text-2xl mb-10 font-medium opacity-90 tracking-wide max-w-2xl mx-auto">
            Discover the latest trends in fashion, beauty, and lifestyle.
          </p>
          <Link
            to="/shop"
            className="inline-block px-12 py-5 bg-pink-600 text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-105 rounded-2xl shadow-2xl active:scale-95"
          >
            Shop Now
          </Link>
        </div>

        {/* Visual Element: Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
