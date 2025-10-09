const Order = require("../models/Order");
const Product = require("../models/Product");
const { orderSchema } = require("../utils/validators");
const {
  sendEmail,
  orderConfirmationEmail,
  orderNotificationEmail,
} = require("../utils/emailService");

const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    console.error("Validation error:", error);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log("Creating order with data:", req.body);
    const orderData = {
      ...req.body,
      // userId: req.body.email,
    };

    // Calculate total and paid amount
    let total = 0;
    for (let product of orderData.products) {
      total += product.price * product.quantity;
    }

    orderData.total = total;
    orderData.paidAmount =
      orderData.paymentType === "half" ? total * 0.5 : total;

    const order = new Order(orderData);
    await order.save();

    // Populate order with product details
    await order.populate("products.productId");

    // Send confirmation email to customer
    try {
      await sendEmail({
        to: order.shippingAddress.email,
        subject: "Order Confirmation - Your Order has been Received",
        html: orderConfirmationEmail(order),
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    // Send notification to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Order Received",
        html: orderNotificationEmail(order),
      });
    } catch (emailError) {
      console.error("Admin notification error:", emailError);
    }

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Server error creating order" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId", "name images")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments({ userId: req.user._id });
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders,
      currentPage: parseInt(page),
      totalPages,
      totalOrders,
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ error: "Server error fetching orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("products.productId", "name images");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if user owns this order or is admin
    if (
      req.user.role !== "admin" &&
      order.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "Server error fetching order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderId: new RegExp(search, "i") },
        { "shippingAddress.name": new RegExp(search, "i") },
        { "shippingAddress.email": new RegExp(search, "i") },
        { "shippingAddress.phone": new RegExp(search, "i") },
      ];
    }

    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    const orders = await Order.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    // Calculate stats
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$paidAmount" },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: "$total" },
        },
      },
    ]);

    res.json({
      orders,
      currentPage: parseInt(page),
      totalPages,
      totalOrders,
      stats: stats[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      },
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ error: "Server error fetching orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      ![
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Send status update email to customer
    try {
      await sendEmail({
        to: order.shippingAddress.email,
        subject: `Order Status Update - ${order.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3B82F6;">Order Status Update</h2>
            <p>Dear ${order.shippingAddress.name},</p>
            <p>Your order <strong>${
              order.orderId
            }</strong> status has been updated to: <strong>${status.toUpperCase()}</strong></p>
            <p>Thank you for your patience!</p>
            <p>Best regards,<br>E-Commerce Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Status update email error:", emailError);
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ error: "Server error updating order status" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
