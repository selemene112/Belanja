const { Router } = require('express');
const routeAuth = Router();
const upload = require('../Midleware/Multer/UploadPhoto');

const { RegisterUserController, LoginUserControlller } = require('../Controller/UserCOntroller/AuthUser');

routeAuth.post('/register', upload.single('photo'), RegisterUserController);
routeAuth.post('/login', LoginUserControlller);

module.exports = routeAuth;
