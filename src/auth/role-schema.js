'use strict';

const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  capabilities: { type: Array, required: true }});
const Role = mongoose.model('roles', roleSchema);

module.exports = Role;