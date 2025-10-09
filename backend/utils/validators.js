const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  longDescription: Joi.string().allow(""),
  howWePrepare: Joi.string().allow(""),
  price: Joi.number().min(0).required(),
  sizes: Joi.array().items(
    Joi.string().valid('5"', '8"', '12"', '16"', '20"', '24"', '28"')
  ),
  stock: Joi.number().min(0),
  featured: Joi.boolean(),
  category: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()),
});

const orderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        name: Joi.string().required(),
        size: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
        customImage: Joi.string().allow(""),
      })
    )
    .min(1)
    .required(),
  paymentType: Joi.string().valid("full", "half").required(),
  transactionId: Joi.string().required(),
  shippingAddress: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.string().required(),
  }).required(),
  notes: Joi.string().allow(""),
});

const reviewSchema = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(10).max(500).required(),
  userName: Joi.string().min(2).max(500).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  orderSchema,
  reviewSchema,
};
