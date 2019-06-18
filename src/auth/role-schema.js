/* eslint-disable no-unused-vars */
'use strict';

const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  capabilities: { type: Array, required: true }});
const Role = mongoose.model('roles', roleSchema);


var seedRoles = function () {
  // eslint-disable-next-line no-unused-vars
  let role1 = new Role({role: 'admin', capabilities: ['admin']});
  role1.save();
  let role2 = new Role({role: 'publisher', capabilities: ['publisher']});
  role2.save();
  let role3 = new Role({role: 'player', capabilities: ['player']});
  role3.save();
};
module.exports = { Role, seedRoles};