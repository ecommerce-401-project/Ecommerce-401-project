'use strict';

const express = require('express');
const adminRouter = (module.exports = new express.Router());
const game = require('../models/games-repo');


// routes
adminRouter.get('admin', getAll);
adminRouter.get('admin/unpublished', getAllUnPublished);
adminRouter.get('admin/approve-game/:id', approveGame);

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