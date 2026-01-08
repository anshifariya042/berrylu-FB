import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center sm:bg-[center_top] transition-all duration-500"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/young-woman-with-shopping-bags-beautiful-dress-hat_1303-17524.jpg?t=st=1762232036~exp=1762235636~hmac=510977942aec0118d12c372231d5f3b1cb3e44551f4114bdf8bed2c7ae47e5dc&w=1060')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text + Button */}
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Bestsellers of <span className="text-pink-300">Berrylu</span> </h2>
          <p className="text-lg md:text-xl mb-6">
            Discover the latest trends in fashion, beauty, and lifestyle.
          </p>
          <Link
            to="/shop"
            className="inline-block px-10 py-3 bg-pink-600 text-white text-lg font-semibold hover:bg-pink-700 transition-transform transform hover:scale-105 rounded-md"
          >
            Shop Now
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
