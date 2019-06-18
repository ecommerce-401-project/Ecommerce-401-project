'use strict';

const express = require('express');
const gameModel = require('../models/games-repo');
const game = new gameModel();
const publisherRouter = (module.exports = new express.Router());

// routes
publisherRouter.post('/games/publisher', createGame);
publisherRouter.delete('/games/publisher/:id', deleteGame);
//TO DO 
//Need a delete own games route
//need get own games route
//need get own unpublished games route
//need get own published games route

// route functions
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
