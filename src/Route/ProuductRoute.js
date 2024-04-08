const { Router } = require('express');
const routeProduct = Router();

const ProductController = require('../Controller/Product/ProductController');
const { ValidasiToken } = require('../Midleware/Jwt/ValidasiTokenAuthMidleware');
const upload = require('../Midleware/Multer/UploadPhoto');

const BathromCOntroller = require('../Controller/Product/BathroomsCOntroller');

//================================== Route Product  ============================================
// Register Product
routeProduct.post('/register', ValidasiToken, upload.single('photo'), ProductController.RegisterProductController);
// Pagnation List Product
routeProduct.get('/list', ProductController.PagnationListProductController);
//================================== END Route ============================================

//================================== Route Bathroom  ============================================
// Register Bathrom
routeProduct.post('/bathroom/:id', ValidasiToken, upload.single('photo'), BathromCOntroller.RegisterBathroomController);
routeProduct.get('/bathroom/:id', BathromCOntroller.ViewAllBathroomController);
routeProduct.get('/bathroom/detail/:id', BathromCOntroller.ViewBathroomByidController);
routeProduct.put('/bathroom/edit/:id', ValidasiToken, upload.single('photo'), BathromCOntroller.EditBathroomController);
routeProduct.delete('/bathroom/delete/:id', ValidasiToken, BathromCOntroller.DeleteBathroomController);
//================================== END Route ============================================

module.exports = routeProduct;
