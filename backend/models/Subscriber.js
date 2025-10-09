const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

subscriberSchema.index({ email: 1 });
subscriberSchema.index({ active: 1, subscribedAt: -1 });

module.exports = mongoose.model('Subscriber', subscriberSchema);