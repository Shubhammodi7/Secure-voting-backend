const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
    unique: [ true, "Email already exists." ]
  },

  mobile: {
    type: String
  },

  address: {
    type: String,
    required: [true, 'Name is required']
  },
  aadharNumber: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['voter', 'admin'],
    default: 'voter'
  },
  isVoted: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
});

userSchema.pre("save", async function(next) {
  try {
      if(!this.isModified("password")) {
        return;
      }
      const bcrypt = require('bcrypt');
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  } 
}

const User = mongoose.model('User', userSchema);

module.exports = User;