'use strict';

require('dotenv').config();
//const Roles = require('./src/auth/role-schema');

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, options).then(() => {
//  Roles.seedRoles();
  require('./src/app.js').start(process.env.PORT);
});
