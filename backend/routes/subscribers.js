const express = require('express');
const {
  subscribe,
  getAllSubscribers,
  unsubscribe,
  deleteSubscriber
} = require('../controllers/subscriberController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', subscribe);

// Admin routes
router.get('/admin/all', adminAuth, getAllSubscribers);
router.put('/:id/unsubscribe', adminAuth, unsubscribe);
router.delete('/:id', adminAuth, deleteSubscriber);

module.exports = router;