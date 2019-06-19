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
    console.log();
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
  async update(_id, game) {
    let gameToUpdate = await Game.findOne({ _id });
    Object.assign(gameToUpdate, game);
    return await gameToUpdate.save();
  }
  delete(_id) {
    return Game.deleteOne({_id});
  }

  approveGame(id) {
    return  Game.update({
      _id: id,
      published: false,
    }, {
      $set: {published: true },
    });
      
  }
}


module.exports = GameRepository;
