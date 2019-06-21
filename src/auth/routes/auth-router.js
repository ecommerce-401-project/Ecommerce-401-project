'use strict';

//const mongoose = require('mongoose');
const express = require('express');
const User = require('../user-schema');
const auth = require('../middleware');

const authRouter = express.Router();

/**
 * @swagger
 * 
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 * 
 * /signup:
 *   post:
 *     description: Creates new user
 *     requestBody:
 *       description: testing out description
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/NewUser' 
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/definitions/NewUser' 
 *     responses:
 *       200:
 *         description: OK
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      req.user = user;
      req.token = user.generateToken();
      res.set('token', req.token);
      res.cookie('auth', req.token);
      //res.send(req.token);
      res.status(200).json({
        username: user.username,
      });
    })
    .catch(next);
});

/**
 * @swagger
 *
 * /signin:
 *   get:
 *     description: Returns a game by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Game'
 */
authRouter.post('/signin', auth(), (req, res) => {
  res.cookie('auth', req.token);
  console.log(res.cookie);
  res.send(req.token);
  console.log(req.token);
});

module.exports = authRouter;
