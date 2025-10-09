const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// User routes
router.post("/", createOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrderById);

// Admin routes
router.get("/admin/all", adminAuth, getAllOrders);
router.put("/:id/status", adminAuth, updateOrderStatus);

module.exports = router;
