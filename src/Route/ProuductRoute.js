const { Router } = require('express');
const routeProduct = Router();

const ProductController = require('../Controller/Product/ProductController');
const { ValidasiToken } = require('../Midleware/Jwt/ValidasiTokenAuthMidleware');
const upload = require('../Midleware/Multer/UploadPhoto');

//================================== Route ============================================

routeProduct.post('/register', ValidasiToken, upload.single('photo'), ProductController.RegisterProductController);

//================================== END Route ============================================

module.exports = routeProduct;
