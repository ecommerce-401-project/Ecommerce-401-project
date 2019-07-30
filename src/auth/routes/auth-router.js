'use strict';

//const mongoose = require('mongoose');
const express = require('express');
const User = require('../user-schema');
const auth = require('../middleware');

const authRouter = express.Router();

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      req.user = user;
      req.token = user.generateToken();
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.status(200).json({
        username: user.username,
      });
    })
    .catch(next);
});

authRouter.post('/signin', auth, (req, res) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});
module.exports = authRouter;
