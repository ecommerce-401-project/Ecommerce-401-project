'use strict';

const express = require('express');
const game = require('../models/games-repo');
const publisherRouter = (module.exports = new express.Router());
const auth = require('../auth/middleware');

// routes
publisherRouter.post('/games/publisher', auth('publisher'), createGame);
publisherRouter.delete('/games/publisher/:id', auth('publisher'), deleteGame);
//TO DO
//Need a delete own games route
//need get own games route
//need get own unpublished games route
//need get own published games route

// route functions
function createGame(req, res) {
  console.log('user', req.user);
  game
    .create({
      ...req.body,
      published: false,
      publisher: req.user._id,
    })
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error(err);
    });
}

function deleteGame(request, response) {
  game
    .delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(err => {
      console.error(err);
    });
}
