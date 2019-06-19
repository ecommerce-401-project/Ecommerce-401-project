'use strict';

// creates users for mongodb
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./role-schema');
require('../models/games-schema');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
  username: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  gameLibrary: [{ type: Schema.ObjectId, ref: 'games' }],
  email: {type: String, lowercase:true},
  role: {
    type: String,
    required: true,
    default: 'player',
    enum: ['admin', 'publisher', 'player'],
  },
},
{ toObject: { virtuals: true }, toJSON: { virtuals: true } }
);



userSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {
      throw error;
    });
});

userSchema.statics.authenticateToken = async function(token) {
  try {
    let parsedToken = jwt.verify(token, process.env.SECRET || 'changeit');
    let query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch (err) {
    return null;
  }
};

userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query).then(
    user => user && user.comparePassword(auth.password)
  );
};

// Compare a plain text password against the hashed one we have saved
userSchema.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

// Generate a JWT from the user id and a secret
userSchema.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit');
};

userSchema.methods.is = function(role) {
  return !role || this.role === role;
};

module.exports = mongoose.model('users', userSchema);

