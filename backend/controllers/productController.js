const Product = require("../models/Product");
const { productSchema } = require("../utils/validators");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

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
    // Only accept images from req.body.images
    if (!req.body || typeof req.body.images === "undefined") {
      return res
        .status(400)
        .json({ error: "No images provided in request body" });
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: "dmomhs5ex",
      api_key: "991351965354934",
      api_secret: "GiLoQJ1XUYrFXkidQi4GflvwUuw",
    });

    // Find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Normalize req.body.images to an array of items
    let raw = req.body.images;
    if (typeof raw === "string") {
      // Try to parse JSON array/string; if that fails treat as single image string (base64 or dataURL)
      try {
        const parsed = JSON.parse(raw);
        raw = parsed;
      } catch (e) {
        // keep raw as string (single image)
      }
    }
    const items = Array.isArray(raw) ? raw : [raw];

    // Normalize items to { data, name }
    const normalized = items.map((it, idx) => {
      if (typeof it === "string") return { data: it, name: `image_${idx}` };
      if (it && (it.data || it.buffer))
        return { data: it.data || it.buffer, name: it.name || `image_${idx}` };
      // If object with fields directly (e.g., { base64: '...' })
      if (it && it.base64)
        return { data: it.base64, name: it.name || `image_${idx}` };
      return { data: it, name: `image_${idx}` };
    });

    const toBuffer = (input) => {
      if (Buffer.isBuffer(input)) return input;
      if (typeof input === "string") {
        if (input.startsWith("data:")) {
          const matches = input.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches[2]) return Buffer.from(matches[2], "base64");
          throw new Error("Invalid base64 data URL");
        }
        // try plain base64
        return Buffer.from(input, "base64");
      }
      throw new Error("Unsupported image data format");
    };

    const uploadBufferToCloudinary = (buffer, name) =>
      new Promise((resolve, reject) => {
        if (!buffer || (Buffer.isBuffer(buffer) && buffer.length === 0)) {
          return reject(new Error(`File ${name} is empty or invalid`));
        }
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "product_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });

    const imageUrls = [];
    for (const item of normalized) {
      try {
        const buffer = toBuffer(item.data);
        const result = await uploadBufferToCloudinary(buffer, item.name);
        imageUrls.push(result.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
        return res
          .status(400)
          .json({
            error: `Error uploading file ${item.name}: ${error.message}`,
          });
      }
    }

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
