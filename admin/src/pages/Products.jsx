import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  ListFilter as Filter,
  CreditCard as Edit,
  Trash2,
  Star,
} from "lucide-react";
import ProductForm from "../components/ProductForm";
import { productsAPI } from "../services/adminApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, filterCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        search: searchTerm,
        category: filterCategory !== "all" ? filterCategory : undefined,
      };

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productsAPI.delete(productId);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  const handleSaveProduct = () => {
    fetchProducts();
  };

  const toggleFeatured = async (product) => {
    try {
      await productsAPI.update(product._id, {
        ...product,
        featured: !product.featured,
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="cakes">Cakes</option>
              <option value="pastries">Pastries</option>
              <option value="cookies">Cookies</option>
              <option value="breads">Breads</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            {products.length} products found
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner w-8 h-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card overflow-hidden">
              <div className="relative">
                <img
                  src={
                    product.images?.[0]
                      ? product.images[0]
                      : "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {product.featured && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary-600">
                    ₹{product.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.averageRating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFeatured(product)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.featured
                          ? "text-yellow-600 hover:bg-yellow-50"
                          : "text-gray-400 hover:bg-gray-50"
                      }`}
                      title="Toggle Featured"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          product.featured ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-primary-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Products;
