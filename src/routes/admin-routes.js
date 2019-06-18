'use strict';
const express = require('express');
const adminRouter = (module.exports = new express.Router());
const gameModel = require('../models/games-model');
const game = new gameModel();


//can get all games on the platform, both published and unpublished
adminRouter.get('/games/admin', getAll);
//can get all published games on the platform
adminRouter.get('/games/admin/approved', getAllPublishedGames);
//can get Only unpublished games
adminRouter.get('/games/admin/unapproved', getAllUnPublished);

function getAll(req, res, next) {
  game
    .getAll()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}
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
  
function getAllUnPublished(req, res, next) {
  game
    .getAllUnPublished()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}