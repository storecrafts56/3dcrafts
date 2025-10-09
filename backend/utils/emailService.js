const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"E-Commerce Platform" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", options.to);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

const orderConfirmationEmail = (order) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #3B82F6;">Order Confirmation</h2>
    <p>Dear ${order.shippingAddress.name},</p>
    <p>Thank you for your order! Your order has been received and is being processed.</p>
    
    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0;">
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Total Amount:</strong> ₹${order.total}</p>
      <p><strong>Payment Type:</strong> ${order.paymentType}</p>
      <p><strong>Paid Amount:</strong> ₹${order.paidAmount}</p>
      <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0;">
      <h3>Products</h3>
      ${order.products
        .map(
          (product) => `
        <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
          <p><strong>${product.name}</strong></p>
          <p>Size: ${product.size} | Quantity: ${product.quantity} | Price: ₹${product.price}</p>
        </div>
      `
        )
        .join("")}
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0;">
      <h3>Shipping Address</h3>
      <p>${order.shippingAddress.address}</p>
      <p>${order.shippingAddress.city}, ${order.shippingAddress.pincode}</p>
      <p>Phone: ${order.shippingAddress.phone}</p>
    </div>
    
    <p>We'll notify you once your order ships. Thank you for choosing us!</p>
    <p>Best regards,<br>E-Commerce Team</p>
  </div>
`;

const orderNotificationEmail = (order) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #3B82F6;">New Order Received</h2>
    <p>A new order has been placed:</p>
    
    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0;">
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer:</strong> ${order.shippingAddress.name}</p>
      <p><strong>Email:</strong> ${order.shippingAddress.email}</p>
      <p><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Payment Type:</strong> ${order.paymentType}</p>
      <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
    </div>
    
    <p><a href="${process.env.ADMIN_URL}/orders" style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none;">View Order Details</a></p>
  </div>
`;

module.exports = {
  sendEmail,
  orderConfirmationEmail,
  orderNotificationEmail,
};
