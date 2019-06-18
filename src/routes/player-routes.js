'use strict';
const express = require('express');
const playerRouter = (module.exports = new express.Router());
const gameModel = require('../models/games-model');
const game = new gameModel();

//player gets all published game - default route
playerRouter.get('/games', getAllPublishedGames);
//player gets game by id || params
playerRouter.get('/games/:id', GameById);
//player can save to own library ?? 
// playerRouter.post('/games/:id/myLibrary', saveGame);

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
// function saveGame() {

// }
