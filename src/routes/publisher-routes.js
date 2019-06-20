'use strict';

const express = require('express');
// const game = require('../models/games-repo');
const publisherRouter = (module.exports = new express.Router());
const auth = require('../../src/auth/middleware');
const publisher = require('../models/publisher-repo');
// const UserRepo = require('../../src/models/users-repo');

// routes
publisherRouter.post('/publisher', auth('publisher'), createGame);
publisherRouter.delete('/games/:id', auth('publisher'), deleteGame);
publisherRouter.get(
  'publisher/games/:id',
  auth('publisher'),
  getPublisherLibrary
);
//TO DO
//Need a delete own games route
//need get own games route
//need get own unpublished games route
//need get own published games route

// route functions
function createGame(req, res, next) {
  publisher.create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function deleteGame(request, response, next) {
  publisher.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}
function getPublisherLibrary(req, res, next) {
  publisher.getGameLibrary(req.user._id)
    .then(data => {
      res.send(data);
    })
    .catch(next);
}
