'use strict';

const Game = require('./games-schema');

// methods to be called in various routes
// TODO: STILL NEED MORE METHODS:
// getowngames
// savetoownlibrary
// deleteowngame

class GameRepository {
  getAllPublished() {
    return Game.find({ published: true });
  }
  getAllUnPublished() {
    return Game.find({ published: false });
  }
  getAll() {
    return Game.find();
  }
  getById(_id) {
    return Game.findById(_id);
  }
  create(game) {
    let newGame = new Game(game);
    return newGame.save();
  }
  async update(_id, entry) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, entry);
    return await gameToUpdate.save();
  }
  delete(_id) {
    return Game.deleteOne({_id});
  }
}

module.exports = GameRepository;
