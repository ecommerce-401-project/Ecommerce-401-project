const express = require('express');

const gameModel = require('../models/games-model');
const game = new gameModel();

const publisherRouter = (module.exports = new express.Router());

publisherRouter.post('/games/publisher', createGame);
publisherRouter.delete('/games/publisher/:id', deleteGame);

function createGame(req, res, next) {
  game
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}
//TODO need to update to delete 'own' games route
function deleteGame(request, response, next) {
  game
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
//TO DO 
//Need a delete own games route
//need get own games route
//need get own unpublished games route
//need get own published games route