const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
  banners: [{
    image: String,
    title: String,
    subtitle: String,
    link: String,
    order: Number
  }],
  videos: [{
    url: String,
    title: String,
    description: String
  }],
  faqs: [{
    question: String,
    answer: String,
    order: Number
  }],
  policies: [{
    title: String,
    content: String,
    icon: String
  }],
  whatsappNumber: {
    type: String,
    default: process.env.WHATSAPP_NUMBER
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Homepage', homepageSchema);