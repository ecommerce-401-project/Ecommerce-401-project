'use strict';

const express = require('express');
const playerRouter = (module.exports = new express.Router());
const game = require('../models/games-repo');

// routes
playerRouter.get('/games', getAllPublishedGames);
playerRouter.get('/games/:id', GameById);
// playerRouter.put('/games/:id', saveGame);

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
// function saveGame(req, res, next) {
//   game
//     .update(req.params.id)
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(next);
// }
