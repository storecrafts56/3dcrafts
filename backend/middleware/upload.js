const fileUpload = require('express-fileupload');
const path = require('path');

const uploadMiddleware = fileUpload({
  limits: { fileSize: process.env.MAX_FILE_SIZE || 5000000 }, // 5MB
  useTempFiles: true,
  tempFileDir: '/tmp/',
  abortOnLimit: true,
  responseOnLimit: 'File too large',
  createParentPath: true
});

const validateImageUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images || req.files.image];

  for (let file of files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid file type. Only JPEG, PNG and WebP images are allowed.' 
      });
    }
  }

  next();
};

module.exports = {
  uploadMiddleware,
  validateImageUpload
};