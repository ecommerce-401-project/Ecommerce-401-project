'use strict';

const express = require('express');
const adminRouter = (module.exports = new express.Router());
// const game = require('../models/games-repo');
const admin = require('../models/admin-repo');
const auth = require('../../src/auth/middleware');

// routes
/** 
 * @swagger
 * /admin:
 *   get:
 *     tags:
 *      - Admin 
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
adminRouter.get('/admin', auth('admin'), getAll);
/** 
 * @swagger
 * /admin/unpublished:
 *   get:
 *     tags:
 *      - Admin  
 *     description: Returns list of unpublished games.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success  
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 */
adminRouter.get('/admin/unpublished', auth('admin'), getAllUnPublished);
/** 
 * @swagger
 * /admin/approve-game:
 *   post:
 *     tags:
 *      - Admin  
 *     description: Admin may publish an unpublished game. 
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: id to be deleted
 *     responses:
 *       200:
 *         description: Success
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 *         
 */
adminRouter.post('/admin/approve-game/:id', auth('admin'), approveGame);
/** 
 * @swagger
 * /admin/delete-game:
 *   delete:
 *     tags:
 *      - Admin 
 *     description: Admin can delete a game. 
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           description: id
 *     responses:
 *       200:
 *         description: Success
 *         schema: 
 *           type: array
 *           items: 
 *             $ref: '#/definitions/Game'
 *         
 */
adminRouter.delete('/admin/delete-game/:id', auth('admin'), deleteGame);

// route functions
function getAll(req, res, next) {
  admin
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
function getAllUnPublished(req, res, next) {
  admin
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

function approveGame(req, res, next) {
  console.log('approveGame', req.path);
  admin
    .approveGame(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function deleteGame(request, response, next) {
  admin.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}