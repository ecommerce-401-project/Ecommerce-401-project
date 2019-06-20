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
 *         description: Title of game
 *       genre:
 *         type: string
 *         description: Type of game
 *       creator:
 *         type: string
 *         description: Who made the game
 *       publisher:
 *         type: string
 *         description:  Who published the game
 *       published:
 *         type: boolean
 *         description: Is the game published 
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

/**
 * @swagger
 *
 * /games/:id:
 *   get:
 *     description: Returns a game by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Game'
 */
playerRouter.get('/games/:id', GameById);

/**
 * @swagger
 *
 * /games/:id/save:
 *   post:
 *     description: Saves game to users library 
 *     parameters:
 *       - name: id
 *         in:  path 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Success
 */
playerRouter.post('/games/:id/save', auth('player'), saveGame);
// playerRouter.post('/games/:id/signin', auth('player'), signIn);

/**
 * @swagger
 *
 * /library:
 *   get:
 *     description: Gets user's library of games 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 */
playerRouter.get('/library', auth('player'), getLibrary);
// playerRouter.delete('/library', auth('player'), deleteFromLibary);


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
  console.log('req.params.id', req.params.id);
  UserRepo.saveGame(req.user, req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
}
function getLibrary(req, res, next) {
  UserRepo.getGameLibrary(req.user._id)
    .then(data => {
      res.send(data);
    })
    .catch(next);
}

// function deleteFromLibary(req, res, next) {
//   game
//     .delete(req.params.id, game.id)
//     .then(data => {
//       res.status(200).json(data);
//     })
//     .catch(next);
// }
