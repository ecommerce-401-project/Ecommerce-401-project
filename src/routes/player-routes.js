'use strict';

const express = require('express');
const playerRouter = (module.exports = new express.Router());
const game = require('../models/games-repo');
const UserRepo = require('../../src/models/users-repo');
const auth = require('../../src/auth/middleware');

/**
 * @swagger
 * definitions:
 *   Game:
 *     type: object
 *     required:
 *       - name
 *       - genre
 *       - creator
 *     properties:
 *       name:
 *         type: string
 *         description:
 *       genre:
 *         type: string
 *         description:
 *       creator:
 *         type: string
 *         description:
 *       publisher:
 *         type: string
 *         description: 
 *       published:
 *         type: boolean
 *         description:
 * /games:
 *   get:
 *     description: Returns list of games
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a list of published games
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 */
playerRouter.get('/games', getAllPublishedGames);

playerRouter.get('/games/:id', GameById);

playerRouter.post('/games/:id/save', auth('player'), saveGame);
// playerRouter.post('/games/:id/signin', auth('player'), signIn);

playerRouter.get('/library', auth('player'), getLibrary);
playerRouter.delete('/library', auth('player'), deleteFromLibary);


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
      if (!result) {
        return next();
      }
      res.status(200).json(result);
    })
    .catch(next);
}
function saveGame(req, res, next) {
  if (!req.params.id || req.params.id.toString().length !== 24) {
    res.send(404);
  } else {
    UserRepo.saveGame(req.user, req.params.id)
      .then(() => {
        // res.status(204);
        res.send('game added!');
      })
      .catch(next);
  }
}
function getLibrary(req, res, next) {
  UserRepo.getGameLibrary(req.user._id)
    .then(data => {
      res.send(data);
    })
    .catch(next);
}

function deleteFromLibary(req, res, next) {
  UserRepo
    .deleteFromLib(req.params.id, game.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}
