import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    oldPrice: "",
    newPrice: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    oldPrice: "",
    newPrice: "",
    category: "western",
    details: {
      color: "",
      material: "",
      style: "",
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products"); // Backend route: /api/products
      setProducts(mapId(res.data));
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product.");
    }
  };

  // ✅ Edit product
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      image: product.image,
      oldPrice: product.oldPrice || "",
      newPrice: product.newPrice || product.price || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({ name: "", image: "", oldPrice: "", newPrice: "" });
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = { ...editingProduct, ...editForm };
      const res = await api.put(`/products/${editingProduct.id}`, updatedProduct);

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? mapId(res.data) : p))
      );

      toast.success("Product updated successfully!");
      setEditingProduct(null);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product.");
    }
  };

  


  // ✅ Toggle Stock Status
  const handleStockToggle = async (product) => {
    try {
      const updatedProduct = { ...product, inStock: !product.inStock };
      const res = await api.put(`/products/${product.id}`, updatedProduct);

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? mapId(res.data) : p))
      );

      toast.success(
        updatedProduct.inStock
          ? `${product.name} is now In Stock`
          : `${product.name} marked as Out of Stock`
      );
    } catch (error) {
      console.error("Stock update failed:", error);
      toast.error("Failed to update stock status");
    }
  };


  


  // ✅ Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const productData = {
      name: newProduct.name,
      image: newProduct.image,
      oldPrice: newProduct.oldPrice,
      newPrice: newProduct.newPrice,
      category: newProduct.category,
      inStock: true,
      details: newProduct.details,
    };

    try {
      const res = await api.post("/products", productData);
      setProducts((prev) => [mapId(res.data), ...prev]);
      toast.success("Product added successfully!");
      setNewProduct({
        name: "",
        image: "",
        oldPrice: "",
        newPrice: "",
        category: "western",
        details: { color: "", material: "", style: "" },
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Add failed:", error);
      toast.error("Failed to add product.");
    }
  };

  // ✅ Filter + Pagination
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg flex items-center gap-3"
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <select
              name="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="western">Western</option>
              <option value="bags">Bags</option>
              <option value="shoes">Shoes</option>
            </select>
            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={newProduct.oldPrice}
              onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="newPrice"
              placeholder="New Price"
              value={newProduct.newPrice}
              onChange={(e) => setNewProduct({ ...newProduct, newPrice: e.target.value })}
              className="border p-2 rounded"
              required
            />
          </div>

          <h3 className="font-semibold text-gray-700 mt-4">Product Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Color"
              value={newProduct.details.color}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: { ...newProduct.details, color: e.target.value } })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Material"
              value={newProduct.details.material}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: { ...newProduct.details, material: e.target.value } })
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Style"
              value={newProduct.details.style}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: { ...newProduct.details, style: e.target.value } })
              }
              className="border p-2 rounded"
            />
          </div>

          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Save Product
          </button>
        </form>
      )}

      {/* Search Bar */}
      <div className="w-full md:w-1/3 flex items-center gap-2 mb-5 px-5">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or category..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Old Price</th>
              <th className="p-4">New Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    {editingProduct?.id === product.id ? (
                      <input type="text" name="image" value={editForm.image} onChange={handleInputChange} className="border p-1 w-full rounded" />
                    ) : (
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                  </td>
                  <td className="p-4">
                    {editingProduct?.id === product.id ? (
                      <input type="text" name="name" value={editForm.name} onChange={handleInputChange} className="border p-1 w-full rounded" />
                    ) : (
                      <span className="font-medium text-gray-800">{product.name}</span>
                    )}
                  </td>
                  <td className="p-4 capitalize text-gray-600">{product.category}</td>
                  <td className="p-4">
                    {editingProduct?.id === product.id ? (
                      <input type="number" name="oldPrice" value={editForm.oldPrice} onChange={handleInputChange} className="border p-1 w-full rounded" />
                    ) : (
                      <span className="text-gray-500 line-through">₹{product.oldPrice}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingProduct?.id === product.id ? (
                      <input type="number" name="newPrice" value={editForm.newPrice} onChange={handleInputChange} className="border p-1 w-full rounded" />
                    ) : (
                      <span className="text-pink-600 font-semibold">₹{product.newPrice || product.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`${product.inStock ? "text-green-600" : "text-red-500"} font-semibold`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <br />
                    <button
                      onClick={() => handleStockToggle(product)}
                      className={`mt-2 flex items-center justify-center text-xl ${product.inStock ? "text-red-500 hover:text-red-700" : "text-green-600 hover:text-green-800"}`}
                      title={product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                    >
                      {product.inStock ? <FaTimesCircle /> : <FaCheckCircle />}
                    </button>
                  </td>
                  <td className="p-4 text-center space-x-3">
                    {editingProduct?.id === product.id ? (
                      <>
                        <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800"><FaCheck /></button>
                        <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800"><FaTimes /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">No matching products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Prev</button>
          <span className="px-4">{currentPage}</span>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
