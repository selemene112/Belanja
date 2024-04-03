const { Router } = require('express');
const routeProduct = Router();

const ProductController = require('../Controller/Product/ProductController');
const { ValidasiToken } = require('../Midleware/Jwt/ValidasiTokenAuthMidleware');
const upload = require('../Midleware/Multer/UploadPhoto');

//================================== Route ============================================
// Register Product
routeProduct.post('/register', ValidasiToken, upload.single('photo'), ProductController.RegisterProductController);
// Pagnation List Product
routeProduct.get('/list', ProductController.PagnationListProductController);
//================================== END Route ============================================

module.exports = routeProduct;
