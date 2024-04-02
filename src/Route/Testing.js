const { Router } = require('express');
const routeAuth = Router();

const { RegisterUserController, LoginUserControlller } = require('../Controller/UserCOntroller/AuthUser');

routeAuth.post('/register', RegisterUserController);
routeAuth.post('/login', LoginUserControlller);

module.exports = routeAuth;
