const express = require('express');
const route = express.Router();
const userModel = require('../models/user.model');
const {newUserRegistration, loginController, getProfileController, changePassword} = require('../Controllers/authController');
const { jwtAuthMiddleware } = require('../Middlewares/jwt');


route.post('/signup', newUserRegistration);
route.post('/login', loginController);

route.get('/profile', jwtAuthMiddleware, getProfileController)
route.put('/profile/password', jwtAuthMiddleware, changePassword)


module.exports = route;