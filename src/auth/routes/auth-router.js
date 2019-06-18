'use strict';
const mongoose = require('mongoose');
const express = require('express');
const User = require('../user-schema');

const authRouter = express.Router();

authRouter.post('/signup', (req, res) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json(user);
    }).catch(err => {
      console.error(err);
    });

});

module.exports = authRouter;