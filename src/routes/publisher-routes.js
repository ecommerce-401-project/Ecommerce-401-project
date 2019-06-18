const express = require('express');

const gameModel = require('../models/games-model');
const game = new gameModel();

const publisherRouter = (module.exports = new express.Router());

publisherRouter.post('/games/publisher', createGame);

function createGame(req, res, next) {
  game
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}
  