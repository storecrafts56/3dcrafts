const express = require('express');
const {
  getHomepageContent,
  updateHomepageContent
} = require('../controllers/homepageController');
const { adminAuth } = require('../middleware/auth');
const { validateImageUpload } = require('../middleware/upload');
const path = require('path');

const router = express.Router();

// Public routes
router.get('/', getHomepageContent);

// Admin routes
router.put('/admin/update', adminAuth, updateHomepageContent);

// Upload banner images
router.post('/admin/upload-banner', adminAuth, validateImageUpload, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const file = req.files.image;
    const fileName = `banner-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.name)}`;
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

    await file.mv(uploadPath);
    const imageUrl = `/uploads/${fileName}`;

    res.json({
      message: 'Banner image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Upload banner error:', error);
    res.status(500).json({ error: 'Server error uploading banner image' });
  }
});

module.exports = router;