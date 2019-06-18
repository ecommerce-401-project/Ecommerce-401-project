'use strict';

// creates users for mongodb
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({ 
  username: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  games: {type: Array},
  email: {type: String, lowercase:true},
});

// checks if table exists OR create new table
const User = mongoose.models.user || mongoose.model('users', userSchema);

// export
module.exports = User;
