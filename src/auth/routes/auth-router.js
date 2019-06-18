'use strict';
const mongoose = require('mongoose');
const express = require('express');
const User = require('../user-schema');

const authRouter = express.Router();

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(user=> {
      res.status(200).json(user);
    }).catch(next);

});

module.exports = authRouter;