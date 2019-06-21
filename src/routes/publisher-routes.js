'use strict';

const express = require('express');
// const game = require('../models/games-repo');
const publisherRouter = (module.exports = new express.Router());
const auth = require('../auth/middleware');
const publisher = require('../models/publisher-repo');
const gameRepo = require('../models/games-repo');
// routes

/**
 * @swagger
 * /games:
 *   post:
 *     description: Creates a new game
 *     produces:
 *      - application/json
 *     parameters:
 *     - name: name
 *       in: query
 *       description: Name of the game
 *       required: true
 *       schema:
 *         type: string
 *     - name: genre
 *       in: query
 *       description: Genre of the game
 *       required: true
 *       schema:
 *         type: string
 *     - name: creator
 *       in: query
 *       description: Who created the game
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Returns the newly created game
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 */

publisherRouter.post('/games', auth('publisher'), createGame);

/**
 * @swagger
 * /games/:id:
 *   delete:
 *     description: Publisher can delete games they created
 *     produces:
 *      - application/json
 *     parameters:
 *     - name: id
 *       type: string
 *       required: true
 *       schema:
 *        in: path
 *     responses:
 *       204:
 *         description: Deletes a publishers game
 */

publisherRouter.delete('/games/:id', auth('publisher'), deleteGame);

/**
 * @swagger
 * /publisher/games/unpublished:
 *   get:
 *     description: Gets all unpublished  games created by current publisher
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns an array of all unpublished games made by current publisher
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 */

publisherRouter.get('/publisher/games/unpublished', auth('publisher'),getUnpublishedLibrary);

/**
 * @swagger
 * /publisher/games/published:
 *   get:
 *     description: Gets all published  games created by current publisher
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns an array of all published games made by current publisher
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 */

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
      .then(() => response.sendStatus(204))
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
