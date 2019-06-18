'use strict';
const express = require('express');
const adminRouter = (module.exports = new express.Router());
const gameModel = require('../models/games-model');
const game = new gameModel();


//can get all games on the platform, both published and unpublished
adminRouter.get('/games/admin', getAll);

//can get Only unpublished games
adminRouter.get('/games/admin/unpublished', getAllUnPublished);

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