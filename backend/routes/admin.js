const express = require('express');
const { adminAuth } = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Review = require('../models/Review');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

// Dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalSubscribers,
      pendingReviews,
      recentOrders
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Subscriber.countDocuments({ active: true }),
      Review.countDocuments({ approved: false }),
      Order.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(10)
    ]);

    // Calculate revenue
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$paidAmount' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const revenue = revenueStats[0] || { totalRevenue: 0, averageOrderValue: 0 };

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalSubscribers,
        pendingReviews,
        totalRevenue: revenue.totalRevenue,
        averageOrderValue: revenue.averageOrderValue
      },
      recentOrders,
      ordersByStatus
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Server error fetching admin stats' });
  }
});

// Upload custom image for orders
router.post('/upload-custom-image', adminAuth, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const file = req.files.image;
    const fileName = `custom-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.name)}`;
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

    await file.mv(uploadPath);
    const imageUrl = `/uploads/${fileName}`;

    res.json({
      message: 'Custom image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    console.error('Upload custom image error:', error);
    res.status(500).json({ error: 'Server error uploading custom image' });
  }
});

// Check pincode availability
router.post('/check-pincode', async (req, res) => {
  try {
    const { pincode } = req.body;
    
    if (!pincode) {
      return res.status(400).json({ error: 'Pincode is required' });
    }

    // For demo purposes, assume all pincodes are available
    // In production, you would check against a database of serviceable pincodes
    const available = true;
    const estimatedDelivery = available ? '3-5 business days' : 'Not available';

    res.json({
      available,
      pincode,
      estimatedDelivery
    });
  } catch (error) {
    console.error('Check pincode error:', error);
    res.status(500).json({ error: 'Server error checking pincode' });
  }
});

module.exports = router;