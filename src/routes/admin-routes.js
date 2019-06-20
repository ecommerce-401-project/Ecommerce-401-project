'use strict';

const express = require('express');
const adminRouter = (module.exports = new express.Router());
const game = require('../models/games-repo');
const auth = require('../../src/auth/middleware');


// routes
adminRouter.get('/admin', auth('admin'), getAll);
adminRouter.get('/admin/unpublished', auth('admin'), getAllUnPublished);
adminRouter.get('/admin/approve-game/:id', auth('admin'), approveGame);
adminRouter.delete('/admin/delete-game/:id', auth('admin'),  deleteGame);

// route functions
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
//  published: {type: Boolean, default: false},

function approveGame(req, res, next) {
  game
    .approveGame(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function deleteGame(req, res, next) {
  game
    .delete(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}