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

  if (!product) return <div>Loading...</div>;

  // ✅ Check stock status (default true if not defined)
  const inStock = product.inStock !== false;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-20 gap-10">
      {/* 🖼️ Product Image */}
      <div className="flex justify-center md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg shadow-lg object-cover w-full max-w-md"
        />
      </div>

      {/* 📄 Product Info */}
      <div className="md:w-1/2 max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

        <div className="flex items-center gap-3 mt-3">
          {product.oldPrice && (
            <p className="text-gray-500 line-through text-lg">
              ₹{product.oldPrice}
            </p>
          )}
          <p className="text-pink-600 font-bold text-2xl">
            ₹{product.newPrice}
          </p>
        </div>

        {/* 🏷️ Stock Status */}
        <p
          className={`mt-3 font-medium ${inStock ? "text-green-600" : "text-red-500"
            }`}
        >
          {inStock ? "In Stock " : "Out of Stock "}
        </p>

        {/* 🧵 Sizes */}
        {product.sizes && (
          <div className="mt-6">
            <p className="text-gray-800 mb-2 font-medium">Size</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!inStock}
                  className={`px-5 py-2 border rounded-full transition ${selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                    } ${!inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 📜 Product Details */}
        {product.details && (
          <div className="mt-8">
            <h3 className="text-gray-800 mb-3 font-semibold text-lg">
              Product Details
            </h3>
            <ul className="text-gray-800 space-y-1">
              {Object.entries(product.details).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium capitalize">{key}:</span>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🔢 Quantity */}
        {inStock && (
          <div className="mt-6">
            <p className="text-gray-800 mb-2 font-medium">Quantity</p>
            <div className="flex items-center border rounded-md w-36">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-2 border-r text-lg"
              >
                –
              </button>
              <span className="flex-1 text-center text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border-l text-lg"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* 🛍️ Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => {
              if (!inStock) return;
              addToCart(product, selectedSize, quantity);
            }}
            disabled={!inStock}
            className={`w-full border border-gray-800 py-3 rounded-md transition ${inStock
              ? "text-gray-800 hover:bg-gray-100"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <button
            onClick={() => {
              if (!inStock) return;
              addToCart(product, selectedSize, quantity);
              navigate("/payment");
            }}
            disabled={!inStock}
            className={`w-full py-3 rounded-md font-medium transition ${inStock
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {inStock ? "Buy it Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
