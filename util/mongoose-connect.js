'use strict';

const mongoose = require('mongoose');

module.exports = connectionString => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true, // avoid a warning
  });
};
