
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus, FaSearch, FaCheckCircle, FaTimesCircle, FaImage, FaBoxOpen } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { mapId } from "../api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [editForm, setEditForm] = useState({ name: "", image: "", oldPrice: "", newPrice: "" });
  const [newProduct, setNewProduct] = useState({
    name: "", image: "", oldPrice: "", newPrice: "", category: "western",
    details: { color: "", material: "", style: "" },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(mapId(res.data));
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product removed");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

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
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await api.put(`/admin/products/${editingProduct.id}`, editForm);
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? mapId(res.data) : p));
      toast.success("Product updated");
      setEditingProduct(null);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleStockToggle = async (product) => {
    try {
      const res = await api.put(`/admin/products/${product.id}`, { inStock: !product.inStock });
      setProducts(prev => prev.map(p => p.id === product.id ? mapId(res.data) : p));
      toast.success("Stock status updated");
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/products", { ...newProduct, inStock: true });
      setProducts((prev) => [mapId(res.data), ...prev]);
      toast.success("Product added successfully");
      setShowAddForm(false);
      setNewProduct({ name: "", image: "", oldPrice: "", newPrice: "", category: "western", details: { color: "", material: "", style: "" } });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Header & Search Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Product Lists</h1>
          <p className="text-slate-500 text-sm">Manage your store listings and stock levels</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className={`w-full sm:w-auto px-6 py-2 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all shadow-lg shadow-pink-500/20 ${
              showAddForm ? "bg-slate-800 text-white" : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {showAddForm ? <FaTimes /> : <FaPlus />} {showAddForm ? "Close" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Add Product Form - Modernized */}
      {showAddForm && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
             New Product Information
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Product Name</label>
                <input type="text"
                  value={newProduct.name}
                   onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                   className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-pink-500/20" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Image URL</label>
                <input type="text"
                  value={newProduct.image}
                   onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-pink-500/20" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Category</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-pink-500/20">
                  <option value="western">Western</option>
                  <option value="bags">Bags</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Old Price</label>
                  <input type="number"
                  value={newProduct.oldPrice} 
                  onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
                   className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-pink-500/20" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">New Price</label>
                  <input type="number"
                    value={newProduct.newPrice}
                     onChange={(e) => setNewProduct({ ...newProduct, newPrice: e.target.value })}
                      className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-pink-500/20" required />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button type="submit" className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {editingProduct?.id === product.id ? (
                        <input type="text" name="image" value={editForm.image} onChange={handleInputChange} className="border border-slate-200 p-1.5 rounded-lg w-32 text-xs" />
                      ) : (
                        <div className="relative group">
                           <img src={product.image} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-pink-100 transition-all" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        {editingProduct?.id === product.id ? (
                          <input type="text" name="name" value={editForm.name} onChange={handleInputChange} className="border border-slate-200 p-1.5 rounded-lg w-full text-sm font-medium" />
                        ) : (
                          <span className="font-bold text-slate-800">{product.name}</span>
                        )}
                        <span className="text-xs text-slate-400 font-mono">ID: {product.id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-slate-600 font-medium">{product.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      {editingProduct?.id === product.id ? (
                        <div className="flex gap-2">
                          <input type="number" name="oldPrice" value={editForm.oldPrice} onChange={handleInputChange} className="w-16 border border-slate-200 p-1 rounded text-xs" />
                          <input type="number" name="newPrice" value={editForm.newPrice} onChange={handleInputChange} className="w-16 border border-slate-200 p-1 rounded text-xs" />
                        </div>
                      ) : (
                        <>
                          <span className="text-slate-400 line-through text-xs">₹{product.oldPrice}</span>
                          <span className="text-pink-600 font-extrabold">₹{product.newPrice || product.price}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        product.inStock ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}>
                        {product.inStock ? "in stock" : "Sold Out"}
                      </span>
                      <button onClick={() => handleStockToggle(product)} className={`p-1.5 rounded-lg transition-colors ${product.inStock ? "text-slate-300 hover:text-rose-500 hover:bg-rose-50" : "text-slate-300 hover:text-emerald-500 hover:bg-emerald-50"}`}>
                        {product.inStock ? <FaTimesCircle size={18} /> : <FaCheckCircle size={18} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {editingProduct?.id === product.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-all"><FaCheck /></button>
                          <button onClick={handleCancelEdit} className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"><FaTimes /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(product)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><FaEdit /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><FaTrash /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }} className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:border-pink-500 hover:text-pink-600 transition-all">Previous</button>
              <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }} className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:border-pink-500 hover:text-pink-600 transition-all">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}