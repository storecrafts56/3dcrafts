const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  longDescription: {
    type: String,
    default: ''
  },
  howWePrepare: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  images: [{
    type: String
  }],
  sizes: [{
    type: String,
    enum: ['5"', '8"', '12"', '16"', '20"', '24"', '28"']
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ featured: 1, createdAt: -1 });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);