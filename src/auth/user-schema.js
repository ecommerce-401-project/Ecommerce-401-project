'use strict';

// creates users for mongodb
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./role-schema');

const userSchema = new mongoose.Schema({ 
  username: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  games: {type: Array},
  email: {type: String, lowercase:true},
  role: {
    type: String,
    required: true,
    default: "player",
    enum: ["admin", "publisher", "player"],
  },
});

// checks if table exists OR create new table
const User = mongoose.models.user || mongoose.model('users', userSchema);

// export
module.exports = User;
