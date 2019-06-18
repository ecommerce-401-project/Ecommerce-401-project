const express = require('express');

const gameModel = require('../models/games-model');
const game = new gameModel();

const publisherRouter = (module.exports = new express.Router());

publisherRouter.post('/games/publisher', createGame);
publisherRouter.delete('/games/publisher', deleteGame);

function createGame(req, res, next) {
  game
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}
function deleteGame(request, response, next) {
  game
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
  