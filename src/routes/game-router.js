'use strict';
const express = require('express');
const gameRouter = (module.exports = (new express.Router()));
const gameModel = require('../models/games-model');
const game = new gameModel();

gameRouter.get('/games', getAllGames);
gameRouter.post('/games', createGames);


function getAllGames(req, res, next) {

  game.getAll()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };

      res.status(200).json(output);
    }).catch(next);
}

function createGames(req, res, next) {

  game.create(req.body)
    .then(result => {
      res.status(200).json(result)
        .catch(next);
    });
}
