'use strict';

const express = require('express');
const playerRouter = (module.exports = new express.Router());
const gameModel = require('../models/games-repo');
const game = new gameModel();

// routes
playerRouter.get('/games', getAllPublishedGames);
playerRouter.get('/games/:id', GameById);

// route functions
function getAllPublishedGames(req, res, next) {
  game
    .getAllPublished()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };

      res.status(200).json(output);
    })
    .catch(next);
}
function GameById(req, res, next) {
  game
    .getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}
