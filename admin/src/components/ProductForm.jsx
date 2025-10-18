import React, { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { productsAPI } from "../services/adminApi";

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    howWePrepare: "",
    price: "",
    sizes: [],
    stock: "",
    featured: false,
    category: "",
    tags: [],
  });
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]); // For newly selected images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productId, setProductId] = useState();

  const availableSizes = ['5"', '8"', '12"', '16"', '20"', '24"', '28"'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        longDescription: product.longDescription || "",
        howWePrepare: product.howWePrepare || "",
        price: product.price || "",
        sizes: product.sizes || [],
        stock: product.stock || "",
        featured: product.featured || false,
        category: product.category || "",
        tags: product.tags || [],
      });
      setImages(product.images || []);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags }));
  };

  // Handle selecting new images (before upload)
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setNewImages((prev) => [...prev, ...files]);
  };

  // Remove selected new image before upload
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove already uploaded image
  const handleRemoveUploadedImage = async (index) => {
    const imageToRemove = images[index];
    if (!product?._id || !imageToRemove) return;
    setLoading(true);
    setError("");
    try {
      await productsAPI.deleteImage(product._id, imageToRemove); // You need to implement this API
      setImages((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      setError("Failed to remove image");
    } finally {
      setLoading(false);
    }
  };

  // Upload selected images
  const handleImageUpload = async () => {
    if (!product?._id && !productId) {
      setError("Please save the product first before uploading images");
      return;
    }
    if (!newImages.length) return;

    setLoading(true);
    setError("");

    const fileToDataUrl = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

    try {
      // Convert all selected files to base64 (data URL) and strip the prefix
      const dataUrls = await Promise.all(
        newImages.map((f) => fileToDataUrl(f))
      );
      const base64Images = dataUrls.map((d) => {
        // d is like "data:image/png;base64,AAA..."
        const parts = d.split(",");
        return parts.length > 1 ? parts[1] : parts[0];
      });

      // Send base64 strings to backend. Backend should expect a JSON body like: { images: [ "AAA...", ... ] }
      const payload = { images: base64Images };
      const response = await productsAPI.uploadImages(
        productId || product._id,
        payload
      );

      // Append returned image paths/URLs (depends on backend response)
      setImages((prev) => [...prev, ...(response.data?.images || [])]);
      setNewImages([]);
      onClose();
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Failed to upload images");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      };

      let response;
      if (product?._id) {
        response = await productsAPI.update(product._id, productData);
      } else {
        response = await productsAPI.create(productData);
        setProductId(response.data.product._id);
      }
      // handleImageUpload();
      onSave(response.data.product);
      // onClose();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="form-input"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="form-label">Long Description</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              className="form-input"
              rows="4"
            />
          </div>

          <div>
            <label className="form-label">How We Prepare</label>
            <textarea
              name="howWePrepare"
              value={formData.howWePrepare}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
            />
          </div>

          <div>
            <label className="form-label">Available Sizes</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.sizes.includes(size)
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              className="form-input"
              placeholder="cake, birthday, chocolate"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Featured Product
            </label>
          </div>

          {/* Multiple image upload and preview */}
          <div>
            <label className="form-label">Product Images</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Images
              </label>
              <button
                type="button"
                className="btn-primary"
                onClick={handleImageUpload}
                disabled={
                  loading || !newImages.length || !(product?._id || productId)
                }
              >
                {loading ? "Uploading..." : "Upload Selected"}
              </button>
            </div>
            {/* Preview new images before upload */}
            {newImages.length > 0 && (
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {newImages.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      onClick={() => handleRemoveNewImage(idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Show already uploaded images */}
            {images.length > 0 && (
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      onClick={() => handleRemoveUploadedImage(index)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
