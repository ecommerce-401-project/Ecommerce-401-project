'use strict';
//public routes 
const Game = require('./games-schema');

// methods to be called in various routes
// TODO: STILL NEED MORE METHODS:
// getowngames
// savetoownlibrary
// deleteowngame

class GameRepository {
  static getAllPublished() {
    return Game.find({ published: true });
  }
  static getById(_id) {
    return Game.findById(_id);
  }
  static async update(_id, game) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, game);
    return await gameToUpdate.save();
  }
}


module.exports = GameRepository;
