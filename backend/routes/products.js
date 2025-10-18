const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  getFeaturedProducts
} = require('../controllers/productController');
const { adminAuth } = require('../middleware/auth');
const { validateImageUpload } = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', adminAuth, createProduct);
router.put('/:id', adminAuth, updateProduct);
router.delete('/:id', adminAuth, deleteProduct);
router.post('/:id/upload', adminAuth, uploadProductImages);

module.exports = router;
