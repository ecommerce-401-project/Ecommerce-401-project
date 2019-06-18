'use strict';

// creates users for mongodb
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({ 
  username: {type: String, required:true},
  password: {type: String, required:true},
  games: {type: Array},
  email: {type: String},
});

// checks if table exists OR create new table
const User = mongoose.models.user || mongoose.model('users', userSchema);

// export
module.exports = User;
