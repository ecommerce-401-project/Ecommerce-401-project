'use strict';

const express = require('express');
const adminRouter = (module.exports = new express.Router());
const gameModel = require('../models/games-repo');
const game = new gameModel();

// routes
adminRouter.get('/games/admin', getAll);
adminRouter.get('/games/admin/unpublished', getAllUnPublished);

// route functions
function getAll(req, res, next) {
  game
    .getAll()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}
function getAllUnPublished(req, res, next) {
  game
    .getAllUnPublished()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}