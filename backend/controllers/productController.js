const Product = require("../models/Product");
const { productSchema } = require("../utils/validators");
const path = require("path");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      featured,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (category && category !== "all") {
      query.category = new RegExp(category, "i");
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (featured === "true") {
      query.featured = true;
    }

    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sort] = sortOrder;

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages,
      totalProducts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Server error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // console.log("Fetched product:", product);
    res.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ error: "Server error fetching product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    console.log("Validation result:", error);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const productData = { ...req.body };
    console.log("Product data after spread:", productData);

    // Handle arrays that might come as strings
    if (typeof productData.sizes === "string") {
      productData.sizes = JSON.parse(productData.sizes);
      console.log("Parsed sizes:", productData.sizes);
    }
    if (typeof productData.tags === "string") {
      productData.tags = JSON.parse(productData.tags);
      console.log("Parsed tags:", productData.tags);
    }

    const product = new Product(productData);
    console.log("Product instance created:", product);
    await product.save();
    console.log("Product saved to DB");

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
    console.log("Response sent for product creation");
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Server error creating product" });
    console.log("Error response sent");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const productData = { ...req.body };

    // Handle arrays that might come as strings
    if (typeof productData.sizes === "string") {
      productData.sizes = JSON.parse(productData.sizes);
    }
    if (typeof productData.tags === "string") {
      productData.tags = JSON.parse(productData.tags);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: "Server error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete associated images
    if (product.images && product.images.length > 0) {
      product.images.forEach((imagePath) => {
        const fullPath = path.join(
          __dirname,
          "..",
          "uploads",
          path.basename(imagePath)
        );
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Server error deleting product" });
  }
};

const uploadProductImages = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ error: "No images provided" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const files = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];
    const imageUrls = [];

    for (let file of files) {
      const fileName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.name)}`;
      const uploadPath = path.join(__dirname, "..", "uploads", fileName);

      await file.mv(uploadPath);
      const imageUrl = `/uploads/${fileName}`;
      imageUrls.push(imageUrl);
    }

    // Add new images to existing ones
    product.images = [...(product.images || []), ...imageUrls];
    await product.save();

    res.json({
      message: "Images uploaded successfully",
      images: imageUrls,
      product,
    });
  } catch (error) {
    console.error("Upload images error:", error);
    res.status(500).json({ error: "Server error uploading images" });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("-__v");

    res.json({ products });
  } catch (error) {
    console.error("Get featured products error:", error);
    res.status(500).json({ error: "Server error fetching featured products" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  getFeaturedProducts,
};
