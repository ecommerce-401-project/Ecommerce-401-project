'use strict';

const express = require('express');
// const game = require('../models/games-repo');
const publisherRouter = (module.exports = new express.Router());
const auth = require('../auth/middleware');
const publisher = require('../models/publisher-repo');
const gameRepo = require('../models/games-repo');
// routes
publisherRouter.post('/games', auth('publisher'), createGame);
publisherRouter.delete('/games/:id', auth('publisher'), deleteGame);
publisherRouter.get('/publisher/games/unpublished', auth('publisher'),getUnpublishedLibrary);
publisherRouter.get('/publisher/games/published', auth('publisher'),getPublishedLibrary);
//TO DO
//Need a delete own games route
//need get own games route
//need get own unpublished games route
//need get own published games route

// route functions
function createGame(req, res, next) {
  publisher
    .create({
      ...req.body,
      published: false,
      publisher: req.user._id,
    })
    .then(result => res.status(200).json(result))
    .catch(next);
}

async function deleteGame(request, response, next) {
  let gameToDelete = await gameRepo.getById(request.params.id);
  if(gameToDelete.publisher.toString() !== request.user._id.toString()) {
    response.status(404).send('Game id does not match any owned by publisher');
    
  } else {
    publisher.delete(request.params.id)
      .then(result => response.status(200).json(result))
      .catch(next);
  }
}
function getUnpublishedLibrary(req, res, next) {
  publisher.getUnpublishedGameLibrary(req.user._id)
    .then(data => {
      res.send(data);
    })
    .catch(next);
}
function getPublishedLibrary(req, res, next) {
  publisher.getPublishedGameLibrary(req.user._id)
    .then(data => {
      res.send(data);
    })
    .catch(next);
}
