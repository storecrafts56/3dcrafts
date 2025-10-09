const express = require("express");
const {
  createReview,
  getProductReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} = require("../controllers/reviewController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/product/:productId", getProductReviews);

// User routes
router.post("/", createReview);

// Admin routes
router.get("/admin/all", adminAuth, getAllReviews);
router.put("/:id/approve", adminAuth, approveReview);
router.delete("/:id", adminAuth, deleteReview);

module.exports = router;
