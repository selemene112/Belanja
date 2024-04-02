const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports = cloudinary;

// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dkucquakt',
//   api_key: '783225448489446',
//   api_secret: 'P9lUt9Hja7ezbFl5loOZd9mC1V0',
// });
