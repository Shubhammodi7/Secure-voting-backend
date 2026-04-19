const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')



const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: "Token not found"});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).json({error: "token not found"});

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: "Invalid token"
    })
  }
}

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: "1d"});
}


const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if(user && user.role === 'admin') {
      return next();
    }

    else {
      return res.status(403).json({
        message: "Access Denied: Admin role required!"
      })
    }

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = {jwtAuthMiddleware, generateToken, isAdmin}