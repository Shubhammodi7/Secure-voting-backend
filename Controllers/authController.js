const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {generateToken, jwtAuthMiddleware} = require('../Middlewares/jwt')


// signup
const newUserRegistration = async (req, res) => {
  try {

    const data = req.body;

    if(data.role === 'admin'){
      const existingAdmin = await userModel.findOne({role: 'admin'});
      if(existingAdmin) {
        return res.status(400).json({message: "Admin already exists"
        })
      }
    }

    const existingUser = await userModel.findOne({aadharNumber: data.aadharNumber});
    if(existingUser) {
      return res.status(400).json({
        message: "User with this aadhar number already exists"
      })
    }
    const newUser = new userModel(data);
    const response = await newUser.save();
    
    const payload = {
      id: response.id
    }
    
    const token = generateToken(payload);

    newUser.token = token;


    res.status(200).json({
      message: "User created successfully",
      token
    })





  } catch (error) {
    console.log("Error while creating new user")
    console.error("Detailed Error:", error);
  }
}

// login
const loginController = async(req, res) => {
  const {aadharNumber, password} = req.body;

  try{
    const user = await userModel.findOne({aadharNumber: aadharNumber});

    if(!user){
      return res.status(400).json({message: 'user not found'});
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch) {
      return res.status(400).json({message: 'Invalid credentials'})
    }

    const payload = {
      id: user.id
    }

    const token = await generateToken(payload);

    res.status(200).json({
      message: "Login successful",
      token
    })
  }
  catch(error) {
    console.log("Error while login")
  }
}

// profile
const getProfileController = async (req, res) => {
  try{
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if(!user) {
      return res.status(400).json({message: "User not found"})
    }

    res.status(200).json({ user });
  }
  catch(error) {
    console.log("Error while fetching profile")
  }
}

// change password
const changePassword = async (req, res) => {
  try {
    const userId = await req.user.id;
    const {oldPassword, newPassword} = req.body;

    const user = await userModel.findById(userId);

    if(!user || !user.comparePassword(oldPassword)){
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }
    
    if (oldPassword === newPassword) {
        return res.status(400).json({
            message: "New password cannot be the same as the old password"
        });
    }
    
    user.password = newPassword;
    await user.save();


    return res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    })
  }
}



module.exports = {
  newUserRegistration,
  loginController,
  getProfileController,
  changePassword
}